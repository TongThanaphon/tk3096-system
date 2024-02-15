import { onSnapshot, collection, query, doc } from 'firebase/firestore'

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

export const getEpic = (
  id: string,
  cb: (value: TaskManagementEpic | null) => void,
) => {
  const unsubscribe = onSnapshot(
    doc(db, TASK_MANAGEMENT_EPICS_COLLECTION, id),
    (doc) => {
      if (doc.exists()) {
        const { name, imageUrl, description } = doc.data()

        const transformData: TaskManagementEpic = {
          id: doc.id,
          name,
          imageUrl,
          description,
        }

        cb(transformData)
      } else {
        cb(null)
      }
    },
  )

  return { unsubscribe }
}

export const getBoard = (
  id: string,
  cb: (value: TaskManagementBoard | null) => void,
) => {
  const unsubscribe = onSnapshot(
    doc(db, TASK_MANAGEMENT_BOARDS_COLLECTION, id),
    (doc) => {
      if (doc.exists()) {
        const { epicId, name, description } = doc.data()

        const transformData: TaskManagementBoard = {
          id: doc.id,
          epicId,
          name,
          description,
        }

        cb(transformData)
      } else {
        cb(null)
      }
    },
  )

  return { unsubscribe }
}
