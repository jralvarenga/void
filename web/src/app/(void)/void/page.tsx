'use client'

import { useRef, useState } from 'react'
import { Search, Plus, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { isUrl } from '@/helpers/isUrl'
import { useAutosizeTextarea } from '@/hooks/useAutosizeTextarea'
import CreateNoteDrawer from '@/components/createNoteDrawer'

export default function VoidPage() {
  const [searchValue, setSearchValue] = useState('')
  const searchInput = useRef<HTMLTextAreaElement>(null)

  // create a note
  const [open, setOpen] = useState(false)

  useAutosizeTextarea(searchInput.current, searchValue)

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
    <div className="overflow-scroll">
      {/* search bar */}
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
      </div>

      <div className="columns-2 gap-6 md:columns-3 lg:columns-4">
        <div className="break-inside-avoid rounded-lg bg-white shadow-md hover:shadow-lg">
          <div className="flex flex-col">
            <div className="basis-14 p-2 text-gray-800">
              <div className="flex justify-between">
                <p className="text-md font-bold leading-6 ">A lion with Dan</p>
                <div className="flex items-center justify-between space-x-1 text-sm text-gray-500">
                  <div className="mt-1 flex gap-1">
                    <span>10</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      className="h-5 w-5"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-4 break-inside-avoid rounded-lg bg-white shadow-md hover:shadow-lg">
          <div className="flex flex-col">
            <img
              className="w-full overflow-hidden"
              src="https://images.unsplash.com/photo-1454496522488-7a8e488e8606?ixlib=rb-1.2.1&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=2952&amp;q=80"
            />
            <div className="basis-14 p-2 text-gray-800">
              <div className="flex justify-between">
                <p className="text-md font-bold leading-6 ">Mountain summit</p>
                <div className="flex items-center justify-between space-x-1 text-sm text-gray-500">
                  <div className="mt-1 flex gap-1">
                    <span>10</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      className="h-5 w-5"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-4 break-inside-avoid rounded-lg bg-white shadow-md hover:shadow-lg">
          <div className="flex flex-col">
            <img
              className="w-full overflow-hidden"
              src="https://cdn.pixabay.com/photo/2015/11/16/16/28/bird-1045954_960_720.jpg"
            />
            <div className="basis-14 p-2 text-gray-800">
              <div className="flex justify-between">
                <p className="text-md font-bold leading-6 ">The bird</p>
                <div className="flex items-center justify-between space-x-1 text-sm text-gray-500">
                  <div className="mt-1 flex gap-1">
                    <span>10</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      className="h-5 w-5"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-4 break-inside-avoid rounded-lg bg-white shadow-md hover:shadow-lg">
          <div className="flex flex-col">
            <img
              className="w-full overflow-hidden"
              src="https://images.unsplash.com/photo-1463288889890-a56b2853c40f?ixlib=rb-1.2.1&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=3132&amp;q=80"
            />
            <div className="basis-14 p-2 text-gray-800">
              <div className="flex justify-between">
                <p className="text-md font-bold leading-6 ">Mountain an lake</p>
                <div className="flex items-center justify-between space-x-1 text-sm text-gray-500">
                  <div className="mt-1 flex gap-1">
                    <span>10</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      className="h-5 w-5"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-4 break-inside-avoid rounded-lg bg-white shadow-md hover:shadow-lg">
          <div className="flex flex-col">
            <img
              className="w-full overflow-hidden"
              src="https://images.unsplash.com/photo-1498603993951-8a027a8a8f84?ixlib=rb-1.2.1&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=2936&amp;q=80"
            />
            <div className="basis-14 p-2 text-gray-800">
              <div className="flex justify-between">
                <p className="text-md font-bold leading-6 ">
                  Beautiful landscape
                </p>
                <div className="flex items-center justify-between space-x-1 text-sm text-gray-500">
                  <div className="mt-1 flex gap-1">
                    <span>4</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      className="h-5 w-5"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-4 break-inside-avoid rounded-lg bg-white shadow-md hover:shadow-lg">
          <div className="flex flex-col">
            <img
              className="w-full overflow-hidden"
              src="https://images.unsplash.com/photo-1526400473556-aac12354f3db?ixlib=rb-1.2.1&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=2940&amp;q=80"
            />
            <div className="basis-14 p-2 text-gray-800">
              <div className="flex justify-between">
                <p className="text-md font-bold leading-6 ">Mountain and sea</p>
                <div className="flex items-center justify-between space-x-1 text-sm text-gray-500">
                  <div className="mt-1 flex gap-1">
                    <span>6</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      className="h-5 w-5"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-4 break-inside-avoid rounded-lg bg-white shadow-md hover:shadow-lg">
          <div className="flex flex-col">
            <div className="w-full overflow-hidden">
              <img
                className="mx-auto h-full w-auto"
                src="https://cdn.pixabay.com/photo/2021/11/30/17/06/tree-6835828_960_720.jpg"
              />
            </div>
            <div className="basis-14 p-2 text-gray-800">
              <div className="flex justify-between">
                <p className="text-md font-bold leading-6 ">
                  The snow and tree
                </p>
                <div className="flex items-center justify-between space-x-1 text-sm text-gray-500">
                  <div className="mt-1 flex gap-1">
                    <span>10</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      className="h-5 w-5"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-4 break-inside-avoid rounded-lg bg-white shadow-md hover:shadow-lg">
          <div className="flex flex-col">
            <div className="w-full overflow-hidden">
              <img
                className="mx-auto h-full w-auto"
                src="https://images.unsplash.com/photo-1617369120004-4fc70312c5e6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1587&q=80"
              />
            </div>
            <div className="basis-14 p-2 text-gray-800">
              <div className="flex justify-between">
                <p className="text-md font-bold leading-6 ">Mountain and fog</p>
                <div className="flex items-center justify-between space-x-1 text-sm text-gray-500">
                  <div className="mt-1 flex gap-1">
                    <span>10</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      className="h-5 w-5"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <CreateNoteDrawer open={open} setOpen={setOpen} />
    </div>
  )
}
