import { API_CODES } from '@/constants/api'
import { adminAuth } from '@/firebase/admin'
import { DecodedIdToken } from 'firebase-admin/auth'
import { jwtDecode } from 'jwt-decode'

/**
 * Pre-checks info on user request
 * - auth
 */
export const verifyIdToken = async (
  headers: Headers,
): Promise<DecodedIdToken> =>
  // eslint-disable-next-line no-async-promise-executor
  new Promise(async (res, rej) => {
    const authorization = headers.get('authorization')
    const token = authorization?.split(' ')[1]

    try {
      if (process.env.NODE_ENV === 'development') {
        const user = jwtDecode(token!) as any
        user.uid = user.user_id

        res(user as DecodedIdToken)
      } else {
        const user = await adminAuth.verifyIdToken(token!)
        res(user)
      }
    } catch (error) {
      rej(API_CODES.INVALID_TOKEN)
    }
  })
