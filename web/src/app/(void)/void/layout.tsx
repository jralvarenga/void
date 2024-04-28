import Navbar from '@/components/navbar'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Budio Void',
  description: 'Your void',
}

export default function VoidLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <main className="p-5">
      <Navbar />
      <br />
      {children}
    </main>
  )
}
