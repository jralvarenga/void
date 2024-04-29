import Navbar from '@/components/navbar'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Budio Login',
  description: 'Sign in to enter your void with Budio',
}

export default function BudioLoginLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return children
}
