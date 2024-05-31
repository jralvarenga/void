import { BudioApiResponse, Note } from 'budio'
import { getUserToken } from './auth'

export async function getNotes(): Promise<BudioApiResponse<{ notes: Note[] }>> {
  const token = await getUserToken()

  const res = await fetch(`${process.env.BASE_URL}/api/notes`, {
    headers: {
      authorization: `Bearer ${token}`,
    },
    next: {
      tags: ['get_notes'],
    },
  })
  const data = await res.json()
  return data
}
