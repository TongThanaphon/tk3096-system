import {
  signInWithEmailAndPassword,
  User,
  onAuthStateChanged as _onAuthStateChanged,
} from 'firebase/auth'

import { auth } from '@/lib/firebase/config/firebase'

import { APIResponse } from '@/types'

export const onAuthStateChanged = (cb: (user: User | null) => void) => {
  return _onAuthStateChanged(auth, cb)
}

export const signInWithEmail = async (email: string, password: string) => {
  try {
    const userCreds = await signInWithEmailAndPassword(auth, email, password)
    const idToken = await userCreds.user.getIdToken()

    const res = await fetch('/api/auth/sign-in', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ idToken }),
    })

    const resBody = (await res.json()) as APIResponse<string>

    return res.ok && resBody.success
  } catch (error) {
    console.log(
      '[FIREBASE_AUTH]: Fail to sign in with email and password ',
      error,
    )
    return false
  }
}

export const signOut = async () => {
  try {
    await auth.signOut()

    const res = await fetch('/api/auth/sign-out', {
      headers: {
        'Content-Type': 'application/json',
      },
    })

    const resBody = (await res.json()) as APIResponse<string>

    return res.ok && resBody.success
  } catch (error) {
    console.log('[FIREBASE_AUTH]: Fail to sign out ', error)
    return false
  }
}
