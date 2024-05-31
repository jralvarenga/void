import { API_CODES, API_MESSAGES } from '@/constants/api'
import { firestore } from '@/firebase/client'
import { verifyIdToken } from '@/helpers/verifyIdToken'
import { BudioApiResponse, Note } from 'budio'
import { collection, getDocs } from 'firebase/firestore'

export async function GET(
  req: Request,
  // { params }: { params: { id: string } },
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

  const notes: Note[] = []
  const querySnapshot = await getDocs(
    collection(firestore(), 'users', userId, 'notes'),
  )
  querySnapshot.forEach((doc) => {
    notes.push({ id: doc.id, ...doc.data() } as Note)
  })

  return Response.json({
    data: {
      notes,
    },
    code: API_CODES.SUCCESS,
  } as BudioApiResponse<{ notes: Note[] }>)
}
