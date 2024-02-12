import { addDoc, collection } from 'firebase/firestore'

import { db } from '@/lib/firebase/config/firebase'

import { DocumentData } from '@/types'

export const addDocument = async <T>(path: string, data: DocumentData<T>) => {
  try {
    const res = await addDoc(collection(db, path), data)

    return res.id
  } catch (error) {
    console.log('[FIRE_STORE]: Fail to add document ' + error)
    return null
  }
}
