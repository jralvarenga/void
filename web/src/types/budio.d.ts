declare module 'budio' {
  export type NewNoteBody = {
    title: string | null
    body: string
  }

  export type Note = {
    title: string | null
    body: string
    createdAt: Date
    updatedAt: Date | null
  }

  export type BudioApiResponse<T> = {
    data: T,
    code: string
  }
}