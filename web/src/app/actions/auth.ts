'use server'

import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
/**
 * Handles login both provider and email/password
 * @param credential user credential
 */
export async function handleLoginStoreWithToken({ token, refreshToken }: { token: string, refreshToken: string }) {
  const cookieStore = cookies()
  cookieStore.set('token', token)
  cookieStore.set('refreshToken', refreshToken)

  redirect('/void')
}