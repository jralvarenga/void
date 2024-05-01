import Navbar from '@/components/navbar'
import { Metadata } from 'next'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export const metadata: Metadata = {
  title: 'Budio Login',
  description: 'Sign in to enter your void with Budio',
}

export default function BudioLoginLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const cookieStore = cookies()
  const token = cookieStore.get('token')
  const refreshToken = cookieStore.get('refreshToken')

  if (token?.value && refreshToken?.value) {
    redirect('/void')
  }

  return children
}
