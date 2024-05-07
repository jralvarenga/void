'use client'

import { useMediaQuery } from '@/hooks/useMediaQuery'
import { Dialog, DialogContent, DialogHeader } from '@/components/ui/dialog'
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
} from '@/components/ui/drawer'
import { Dispatch, SetStateAction, SyntheticEvent, useRef } from 'react'
import { useAutosizeTextarea } from '@/hooks/useAutosizeTextarea'
import { Toaster } from '@/components/ui/sonner'
import { useAutosaveNote } from '@/hooks/useAutosaveNote'
import { Textarea } from './ui/textarea'
import { Button } from './ui/button'
import { Icons } from './genIcons'

function NoteFormContent({
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
  const noteTitle = useRef<HTMLTextAreaElement>(null)
  const noteBody = useRef<HTMLTextAreaElement>(null)

  useAutosizeTextarea(noteBody.current, body)
  useAutosizeTextarea(noteTitle.current, title)

  return (
    <div className="grid w-full gap-3">
      <textarea
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="New Note"
        className="resize-none overflow-hidden rounded-xl border-0 bg-inherit px-3 text-xl font-bold"
        rows={1}
        ref={noteTitle}
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
    </div>
  )
}

interface Props {
  open: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
  title?: string | undefined | null
  body?: string | undefined | null
  noteId?: string | undefined | null
}

export default function NoteEditorDrawer({
  open,
  setOpen,
  title: defaultTitle,
  body: defaultBody,
  noteId: defaultNoteId,
}: Props) {
  const isDesktop = useMediaQuery('(min-width: 768px)')

  const { loading, noteSavingHandle, body, setBody, setTitle, title } =
    useAutosaveNote({
      body: defaultBody,
      noteId: defaultNoteId,
      title: defaultTitle,
    })

  async function newNoteHandle(e: SyntheticEvent) {
    e.preventDefault()
    noteSavingHandle()
  }

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <form onSubmit={newNoteHandle}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader className="flex w-full flex-row items-center gap-3">
              <Button
                disabled={loading}
                size="sm"
                className="h-7 w-20"
                type="submit"
              >
                Save
              </Button>
              {loading && (
                <div className="flex items-center text-sm">
                  <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                  <span>saving</span>
                </div>
              )}
            </DialogHeader>
            <NoteFormContent
              body={body}
              setBody={setBody}
              title={title}
              setTitle={setTitle}
              loading={loading}
            />
          </DialogContent>
        </form>
        <Toaster />
      </Dialog>
    )
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerContent>
        <DrawerHeader className="text-left" />
        <form className="px-5" onSubmit={newNoteHandle}>
          <NoteFormContent
            body={body}
            setBody={setBody}
            title={title}
            setTitle={setTitle}
            loading={loading}
          />
          <Button disabled={loading} className="w-full">
            {loading && <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />}
            Save
          </Button>
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
