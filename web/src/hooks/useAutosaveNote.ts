import { auth } from '@/firebase/client'
import { BudioApiResponse, NewNoteBody } from 'budio'
import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from 'react'

interface Props {
  title?: string | undefined | null
  body?: string | undefined | null
  noteId?: string | undefined | null
}

interface Return {
  loading: boolean
  noteSavingHandle: () => Promise<void>
  title: string
  body: string
  setTitle: Dispatch<SetStateAction<string>>
  setBody: Dispatch<SetStateAction<string>>
}

/**
 * handle hooks to autosave a note every minute or desire time
 */
export function useAutosaveNote({
  title: defaultTitle,
  body: defaultBody,
  noteId: defaultNoteId,
}: Props): Return {
  const [noteId, setNoteId] = useState<string | null>(null)
  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')
  const [loading, setLoading] = useState(false)

  // prev values
  const [prevTitle, setPrevTitle] = useState('')
  const [prevBody, setPrevBody] = useState('')

  /**
   * set a note id to be able to update note
   */
  useEffect(() => {
    if (defaultNoteId) {
      setNoteId(defaultNoteId)
    }
  }, [defaultNoteId])

  /**
   * set default values if they exist
   */
  useEffect(() => {
    if (defaultTitle) {
      setTitle(defaultTitle)
      setPrevTitle(defaultTitle)
    }
    if (defaultBody) {
      setBody(defaultBody)
      setPrevBody(defaultBody)
    }
  }, [defaultTitle, defaultBody])

  /**
   * handle saving a note
   */
  const noteSavingHandle = useCallback(async () => {
    setLoading(true)

    const jsonBody: NewNoteBody = {
      title,
      body,
    }

    try {
      const token = await auth().currentUser?.getIdToken()
      const res = await fetch(
        noteId ? `/api/note/${noteId}` : `/api/new-note`,
        {
          method: noteId ? 'put' : 'post',
          headers: {
            authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(jsonBody),
        },
      )
      const { data } = (await res.json()) as BudioApiResponse<{
        noteId: string
      }>
      setNoteId(data.noteId)
      setPrevBody(body)
      setPrevTitle(title)

      // setOpen(false)
      // toast.success(`Note Saved`, {
      //   description: `${title !== '' ? ` ${title}` : ''} saved`,
      // })
      setLoading(false)
    } catch (error) {
      setLoading(false)
    }
  }, [body, noteId, title])

  /**
   * handle autosaving interval
   */
  useEffect(() => {
    const autosaveInterval = setInterval(() => {
      if (prevBody !== body || prevTitle !== title) {
        noteSavingHandle()
      }
    }, 15 * 1000)

    return () => clearInterval(autosaveInterval)
  }, [body, noteSavingHandle, prevBody, prevTitle, title])

  return {
    loading,
    noteSavingHandle,
    title,
    body,
    setBody,
    setTitle,
  }
}
