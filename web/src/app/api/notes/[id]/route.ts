import { API_CODES, API_MESSAGES } from '@/constants/api'
import { firestore } from '@/firebase/client'
import { verifyIdToken } from '@/helpers/verifyIdToken'
import { BudioApiResponse, NewNoteBody, Note } from 'budio'
import { doc, updateDoc } from 'firebase/firestore'

export async function PUT(
  req: Request,
  { params }: { params: { id: string } },
) {
  let userId: string
  try {
    const user = await verifyIdToken(req.headers)
    userId = user.uid
  } catch (error) {
    return Response.json(
      {
        data: API_MESSAGES.BEARER_TOKEN_NOT_VALID,
        code: API_CODES.INVALID_TOKEN,
      } as BudioApiResponse<string>,
      { status: 400 },
    )
  }

  let body: NewNoteBody
  try {
    body = await req.json()
  } catch (error) {
    return Response.json(
      {
        data: API_MESSAGES.BAD_REQUEST_BODY_FORMAT,
        code: API_CODES.WARNING,
      } as BudioApiResponse<string>,
      { status: 400 },
    )
  }

  const newNote: Note = {
    title: body.title === '' ? null : body.title,
    body: body.body,
    tags: [],
    createdAt: new Date(),
    updatedAt: null,
  }

  await updateDoc(doc(firestore(), 'users', userId, 'notes', params.id), {
    ...newNote,
  })

  return Response.json({
    data: {
      noteId: params.id,
    },
    code: API_CODES.SUCCESS,
  } as BudioApiResponse<any>)
}
