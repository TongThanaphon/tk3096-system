import { onSnapshot, collection, query } from 'firebase/firestore'

import { db } from '@/lib/firebase/config/firebase'

import { TaskManagementBoard, TaskManagementEpic } from '@/types'

import {
  TASK_MANAGEMENT_BOARDS_COLLECTION,
  TASK_MANAGEMENT_EPICS_COLLECTION,
} from '@/lib/firebase/config/constant'

export const getEpics = (cb: (value: TaskManagementEpic) => void) => {
  const q = query(collection(db, TASK_MANAGEMENT_EPICS_COLLECTION))
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

export const getBoards = (cb: (value: TaskManagementBoard) => void) => {
  const q = query(collection(db, TASK_MANAGEMENT_BOARDS_COLLECTION))
  const unsubscribe = onSnapshot(q, (snapshots) => {
    snapshots.forEach((doc) => {
      const { epicId, name, description } = doc.data()

      const transformData: TaskManagementBoard = {
        id: doc.id,
        epicId,
        name,
        description,
      }

      cb(transformData)
    })
  })

  return {
    unsubscribe,
  }
}
