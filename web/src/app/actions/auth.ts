'use server'

import { DecodedUser, RefreshTokenResponse } from 'budio'
import { jwtDecode } from 'jwt-decode'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
/**
 * Handles login both provider and email/password
 * @param credential user credential
 */
export async function handleLoginStoreWithToken({
  token,
  refreshToken,
}: {
  token: string
  refreshToken: string
}) {
  const cookieStore = cookies()
  cookieStore.set('token', token)
  cookieStore.set('refreshToken', refreshToken)

  redirect('/void')
}

/**
 * get user token
 * @returns Decoded user
 */
export async function getUserToken(): Promise<string | null | undefined> {
  const cookiesStore = cookies()
  const token = cookiesStore.get('token')?.value
  const refreshToken = cookiesStore.get('refreshToken')?.value

  if (!token || !refreshToken) {
    return undefined
  }
  const user = (await jwtDecode(token!)) as DecodedUser

  const expDate = new Date(user.exp * 1000)
  const currentDate = new Date()
  if (
    expDate.getTime() - currentDate.getTime() <= 0 &&
    process.env.NODE_ENV === 'production'
  ) {
    const response = await fetch(
      `${process.env.BASE_URL}/api/auth/refresh-token`,
      {
        method: 'POST',
        body: JSON.stringify({
          refreshToken,
        }),
      },
    )
    const data = (await response.json()) as RefreshTokenResponse
    return data.token
  }
  return token
}
