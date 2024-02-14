import 'server-only'

import { cookies } from 'next/headers'
import { getApps, cert, initializeApp } from 'firebase-admin/app'
import { getAuth, SessionCookieOptions } from 'firebase-admin/auth'
import { DocumentData, getFirestore } from 'firebase-admin/firestore'

import { SESSION_KEY } from '@/lib/firebase/config/constant'

const config = {
  credential: cert(
    process.cwd() + '/' + process.env.NEXT_PUBLIC_FIREBASE_ADMIN_CONFIG,
  ),
}

export const app = !getApps().length
  ? initializeApp(config, 'tk3096-system')
  : getApps()[0]

export const auth = getAuth(app)

export const db = getFirestore(app)

export const getSession = async () => {
  try {
    return cookies().get(SESSION_KEY)?.value
  } catch (error) {
    console.log('[FIREBASE_ADMIN]: Fail to get session ', error)
    return undefined
  }
}

export const isUserAuthenticated = async (
  session: string | undefined = undefined,
) => {
  const _session = session ?? (await getSession())

  if (!_session) {
    return false
  }

  try {
    const isRevoked = !(await auth.verifySessionCookie(_session, true))
    return !isRevoked
  } catch (error) {
    console.log('[FIREBASE_ADMIN]: Fail to check user authenticated ', error)
    return false
  }
}

export const getCurrentUser = async () => {
  const session = await getSession()

  if (!(await isUserAuthenticated(session))) {
    return null
  }

  const decodedIdToken = await auth.verifySessionCookie(session!)
  const currentUser = await auth.getUser(decodedIdToken.uid)

  return currentUser
}

export const createSessionCookie = async (
  idToken: string,
  SessionCookieOptions: SessionCookieOptions,
) => {
  return auth.createSessionCookie(idToken, SessionCookieOptions)
}

export const revokeAllSessions = async (session: string) => {
  const decodedIdToken = await auth.verifySessionCookie(session)

  return await auth.revokeRefreshTokens(decodedIdToken.uid)
}

export const addDocument = async (data: DocumentData, collection: string) => {
  try {
    const docRef = await db.collection(collection).add(data)

    return docRef.id
  } catch (error) {
    console.log('[FIRESTORE] Fail to add document ', error)
    return null
  }
}

export const updateDocument = async (
  id: string,
  data: DocumentData,
  collection: string,
) => {
  try {
    await db.collection(collection).doc(id).update(data)

    return true
  } catch (error) {
    console.log('[FIRESTORE] Fail to update document ', error)
    return false
  }
}
