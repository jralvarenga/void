import { useMediaQuery } from '@/hooks/useMediaQuery'
import { Dialog, DialogContent, DialogHeader } from '@/components/ui/dialog'
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
} from '@/components/ui/drawer'
import { toast } from 'sonner'
import {
  Dispatch,
  SetStateAction,
  SyntheticEvent,
  useRef,
  useState,
} from 'react'
import { useAutosizeTextarea } from '@/hooks/useAutosizeTextarea'
import { BudioApiResponse, NewNoteBody } from 'budio'
import { auth } from '@/firebase/client'
import { Toaster } from '@/components/ui/sonner'
import { Textarea } from './ui/textarea'
import { Input } from './ui/input'
import { Button } from './ui/button'

function NewNoteFormContent({
  body,
  setBody,
  title,
  setTitle,
  loading,
}: {
  title: string
  setTitle: Dispatch<SetStateAction<string>>
  body: string
  setBody: Dispatch<SetStateAction<string>>
  loading: boolean
}) {
  const noteBody = useRef<HTMLTextAreaElement>(null)

  useAutosizeTextarea(noteBody.current, body)
  return (
    <div className="grid w-full gap-3">
      <Input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="New Note"
        className="border-0 p-0 text-xl font-bold"
        disabled={loading}
      />
      <Textarea
        ref={noteBody}
        className="h-full w-full resize-none overflow-hidden rounded-xl border-0"
        placeholder="write your thought..."
        required
        rows={1}
        value={body}
        onChange={(e) => setBody(e.target.value)}
        disabled={loading}
      />

      <Button disabled={loading} type="submit">
        Save
      </Button>
    </div>
  )
}

interface Props {
  open: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
}

export default function CreateNoteDrawer({ open, setOpen }: Props) {
  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')
  const [loading, setLoading] = useState(false)
  const isDesktop = useMediaQuery('(min-width: 768px)')

  async function newNoteHandle(e: SyntheticEvent) {
    e.preventDefault()
    setLoading(true)

    const jsonBody: NewNoteBody = {
      title,
      body,
    }

    try {
      const token = await auth().currentUser?.getIdToken()
      const res = await fetch(`/api/new-note`, {
        method: 'post',
        headers: {
          authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(jsonBody),
      })
      ;(await res.json()) as BudioApiResponse<{ noteId: number }>
      setOpen(false)
      toast.success(`Note added.`, {
        description: `${title !== '' ? ` ${title}` : ''} added`,
      })
      setLoading(false)
    } catch (error) {
      setLoading(false)
    }
  }

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader />
          <form onSubmit={newNoteHandle}>
            <NewNoteFormContent
              body={body}
              setBody={setBody}
              title={title}
              setTitle={setTitle}
              loading={loading}
            />
          </form>
        </DialogContent>
        <Toaster />
      </Dialog>
    )
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerContent>
        <DrawerHeader className="text-left" />
        <form className="px-5" onSubmit={newNoteHandle}>
          <NewNoteFormContent
            body={body}
            setBody={setBody}
            title={title}
            setTitle={setTitle}
            loading={loading}
          />
        </form>
        <DrawerFooter className="pt-2">
          <DrawerClose asChild>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
      <Toaster position="top-right" />
    </Drawer>
  )
}
