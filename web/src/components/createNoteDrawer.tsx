import { useMediaQuery } from '@/hooks/useMediaQuery'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from '@/components/ui/drawer'
import { Button } from './ui/button'
import { Dispatch, SetStateAction, useRef, useState } from 'react'
import { Input } from './ui/input'
import { Textarea } from './ui/textarea'
import { useAutosizeTextarea } from '@/hooks/useAutosizeTextarea'

function NewNoteTitle({
  value,
  setValue,
}: {
  value: string
  setValue: Dispatch<SetStateAction<string>>
}) {
  return (
    <Input
      value={value}
      onChange={(e) => setValue(e.target.value)}
      placeholder="New Note"
      className="border-0 p-0 text-xl font-bold"
    />
  )
}

function NewNoteBody({
  value,
  setValue,
}: {
  value: string
  setValue: Dispatch<SetStateAction<string>>
}) {
  const noteBody = useRef<HTMLTextAreaElement>(null)

  useAutosizeTextarea(noteBody.current, value)
  return (
    <div className="grid w-full gap-3">
      <Textarea
        ref={noteBody}
        className="h-full w-full resize-none overflow-hidden rounded-xl border-0"
        placeholder="write your thought..."
        rows={1}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />

      <Button>Save</Button>
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
  const isDesktop = useMediaQuery('(min-width: 768px)')

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>
              <NewNoteTitle value={title} setValue={setTitle} />
            </DialogTitle>
          </DialogHeader>
          <NewNoteBody value={body} setValue={setBody} />
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerContent>
        <DrawerHeader className="text-left">
          <DrawerTitle>
            <NewNoteTitle value={title} setValue={setTitle} />
          </DrawerTitle>
        </DrawerHeader>
        <div className="px-5">
          <NewNoteBody value={body} setValue={setBody} />
        </div>
        <DrawerFooter className="pt-2">
          <DrawerClose asChild>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}
