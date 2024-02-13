import { onSnapshot, collection, query } from 'firebase/firestore'

import { db } from '@/lib/firebase/config/firebase'

import { TaskManagementEpic } from '@/types'

export const getEpics = (
  path: string,
  cb: (value: TaskManagementEpic) => void,
) => {
  const q = query(collection(db, path))
  const unsubscribe = onSnapshot(q, (snapshots) => {
    snapshots.forEach((doc) => {
      const { name, imageUrl, description } = doc.data()

      const transformData: TaskManagementEpic = {
        id: doc.id,
        name,
        imageUrl,
        description,
      }

      cb(transformData)
    })
  })

  return {
    unsubscribe,
  }
}
