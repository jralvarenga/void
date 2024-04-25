'use client'

import { FormEvent, useCallback, useEffect, useRef, useState } from 'react'
import ogs from 'open-graph-scraper'

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
      <div className=" flex w-full max-w-xl flex-col">
        {/* <div className="searchbar-shadow  bg-background relative flex h-14 w-full rounded-full"> */}
        <form
          className="bg-background relative flex h-14 w-full gap-3 rounded-full"
          onSubmit={getUrlMetadata}
        >
          <input
            type="text"
            ref={searchInput}
            className="h-full w-full rounded-full border bg-inherit p-4 duration-300 focus:-mt-3 focus:drop-shadow-xl"
            placeholder="search in your void..."
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
          <button>search</button>
        </form>
      </div>
    </div>
  )
}
