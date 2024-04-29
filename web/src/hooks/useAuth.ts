import { auth } from '@/firebase/client'
import { User } from 'firebase/auth'
import { useState, useEffect } from 'react'

/**
 * gets user
 * @returns user state
 */
export function useAuth() {
  const [authState, setAuthState] = useState({
    isSignedIn: false,
    pending: true,
    user: null as User | null,
  })

  useEffect(() => {
    const unregisterAuthObserver = auth().onAuthStateChanged(user =>
      setAuthState({ user, pending: false, isSignedIn: !!user })
    )
    return () => unregisterAuthObserver()
  }, [])

  return { auth, ...authState }
}