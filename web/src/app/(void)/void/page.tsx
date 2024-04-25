'use client'

import { FormEvent, useRef, useState } from 'react'
import { Search, Plus } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

export default function VoidPage() {
  const [searchValue, setSearchValue] = useState('')
  const searchInput = useRef<HTMLInputElement>(null)

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

  async function getUrlMetadata(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const res = await fetch('/api/scrapper', {
      method: 'post',
      body: JSON.stringify({
        url: '',
      }),
    })
    const data = await res.text()
    console.log(data)
  }

  return (
    // search bar
    <div className="flex w-full items-center justify-center">
      <div className=" flex w-full max-w-xl items-center gap-2">
        <form className="searchbar-shadow relative flex h-12 w-full items-center gap-3 rounded-full bg-background">
          <Search className="absolute left-4 h-4 w-4 text-muted-foreground" />
          <Input
            type="text"
            ref={searchInput}
            className="h-full w-full rounded-full border bg-inherit p-3 pl-10 duration-300 focus:-mt-3 focus:pl-3 focus:drop-shadow-xl"
            placeholder="search in your void..."
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
        </form>
        <Button
          variant="outline"
          size="icon"
          className="h-12 w-14 rounded-full"
        >
          <Plus className="h-6 w-6" />
        </Button>
      </div>
    </div>
  )
}
