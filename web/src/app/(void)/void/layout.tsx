import Navbar from '@/components/navbar'
import { Metadata } from 'next'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export const metadata: Metadata = {
  title: 'Budio Void',
  description: 'Your void',
}

export default function VoidLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const cookieStore = cookies()
  const token = cookieStore.get('token')
  const refreshToken = cookieStore.get('refreshToken')

  if (!token?.value && !refreshToken?.value) {
    redirect('/login')
  }

  return (
    <main className="p-5">
      <Navbar />
      <br />
      {children}
    </main>
  )
}
