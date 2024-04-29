'use client'

import { HTMLAttributes, SyntheticEvent, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { cn } from '@/lib/utils'
import { Icons } from './genIcons'
import {
  createUserWithEmailAndPassword,
  fetchSignInMethodsForEmail,
  signInWithEmailAndPassword,
} from 'firebase/auth'
import { auth } from '@/firebase/client'
import { handleLoginStoreWithToken } from '@/app/actions/auth'

interface UserAuthFormProps extends HTMLAttributes<HTMLDivElement> {}

export function UserAuthForm({ className, ...props }: UserAuthFormProps) {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  async function checkEmail(event: SyntheticEvent) {
    event.preventDefault()
    setIsLoading(true)
    const emailMethods = await fetchSignInMethodsForEmail(auth(), email)
    console.log(emailMethods)
    if (
      emailMethods.includes('password') ||
      emailMethods.length > 0 ||
      emailMethods.length === 0
    ) {
      setShowPassword(true)
    }
    setIsLoading(false)
  }

  async function loginHandle(event: SyntheticEvent) {
    event.preventDefault()
    setIsLoading(true)
    const emailMethods = await fetchSignInMethodsForEmail(auth(), email)
    if (emailMethods.includes('password')) {
      const { user } = await signInWithEmailAndPassword(auth(), email, password)
      const token = await user.getIdToken()
      const refreshToken = user.refreshToken
      await handleLoginStoreWithToken({ refreshToken, token })
    }
    if (!emailMethods.includes('password')) {
      const { user } = await createUserWithEmailAndPassword(
        auth(),
        email,
        password,
      )
      const token = await user.getIdToken()
      const refreshToken = user.refreshToken
      await handleLoginStoreWithToken({ refreshToken, token })
    }
    if (!emailMethods.includes('password') && emailMethods.length > 0) {
      console.log('addsmethod')
    }
    setIsLoading(false)
  }

  return (
    <>
      <p className="text-center text-sm text-muted-foreground">
        {showPassword
          ? 'If is your first time login in, an user will be created with the password you enter'
          : 'Enter your email below to login or create your account and enter your void'}
      </p>
      <div className={cn('grid gap-6', className)} {...props}>
        <form onSubmit={showPassword ? loginHandle : checkEmail}>
          <div className="grid gap-2">
            <div className="grid gap-1">
              <Label className="sr-only" htmlFor="email">
                Email
              </Label>
              <Input
                id="email"
                required
                placeholder="name@example.com"
                type="email"
                autoCapitalize="none"
                autoComplete="email"
                autoCorrect="off"
                disabled={isLoading}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            {showPassword && (
              <div className="grid gap-1">
                <Label className="sr-only" htmlFor="password">
                  Password
                </Label>
                <Input
                  id="password"
                  required
                  placeholder="yourpassword123"
                  type="password"
                  autoCapitalize="none"
                  autoComplete="current-password webauthn"
                  autoCorrect="off"
                  disabled={isLoading}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            )}

            {showPassword ? (
              <Button disabled={isLoading}>
                {isLoading && (
                  <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                )}
                Sign in
              </Button>
            ) : (
              <Button disabled={isLoading}>
                {isLoading && (
                  <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                )}
                Next
              </Button>
            )}
          </div>
        </form>
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground">
              Or continue with
            </span>
          </div>
        </div>
        <Button variant="outline" type="button" disabled={isLoading}>
          {isLoading ? (
            <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <Icons.gitHub className="mr-2 h-4 w-4" />
          )}{' '}
          GitHub
        </Button>
      </div>
    </>
  )
}
