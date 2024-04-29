'use client'

import { useEffect, useRef, useState } from 'react'
import { Search, Plus, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { isUrl } from '@/helpers/isUrl'
import { useAutosizeTextarea } from '@/hooks/useAutosizeTextarea'
import CreateNoteDrawer from '@/components/createNoteDrawer'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '@/firebase/client'

export default function VoidPage() {
  const [searchValue, setSearchValue] = useState('')
  const searchInput = useRef<HTMLTextAreaElement>(null)

  // create a note
  const [open, setOpen] = useState(false)

  useAutosizeTextarea(searchInput.current, searchValue)

  // const handlePasteEvent = useCallback((event: ClipboardEvent) => {
  //   console.log('xd')
  //   const { key, keyCode } = event
  //   if (keyCode === 32 || (keyCode >= 65 && keyCode <= 90)) {
  //     console.log('xd')

  //     // setUserText(prevUserText => `${prevUserText}${key}`);
  //   }
  // }, [])

  // useEffect(() => {
  //   window.addEventListener('paste', handlePasteEvent)

  //   return () => {
  //     window.removeEventListener('paste', handlePasteEvent)
  //   }
  // }, [])

  // async function getUrlMetadata(e: FormEvent<HTMLFormElement>) {
  //   e.preventDefault()
  //   const res = await fetch('/api/scrapper', {
  //     method: 'post',
  //     body: JSON.stringify({
  //       url: '',
  //     }),
  //   })
  //   const data = await res.text()
  //   console.log(data)
  // }

  return (
    // search bar
    <div className="flex w-full items-center justify-center">
      <div className=" flex w-full max-w-xl items-center gap-2">
        <form className="searchbar-shadow relative flex h-14 w-full items-center gap-3 rounded-full bg-background">
          <div className="absolute left-4">
            <Search className=" h-4 w-4 text-muted-foreground" />
          </div>
          <textarea
            ref={searchInput}
            className="h-full w-full resize-none overflow-hidden rounded-3xl border bg-inherit p-3 pl-11 duration-300 focus:-mt-3 focus:pl-4 focus:drop-shadow-xl"
            placeholder="type in your void..."
            value={searchValue}
            rows={1}
            onChange={(e) => setSearchValue(e.target.value)}
          />
        </form>
        <Button
          variant="outline"
          size="icon"
          className="h-12 w-14 rounded-full"
          onClick={() => setOpen(true)}
        >
          {isUrl(searchValue) ? (
            <ArrowRight className="h-6 w-6" />
          ) : (
            <Plus className="h-6 w-6" />
          )}
        </Button>
      </div>

      <CreateNoteDrawer open={open} setOpen={setOpen} />
    </div>
  )
}
