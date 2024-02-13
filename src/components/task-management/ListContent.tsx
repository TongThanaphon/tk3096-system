'use client'

import { useEffect, useState } from 'react'

import { TaskManagementEpic } from '@/types'

import { CollapseItem } from '@/components/task-management/CollapseItem'

import { getEpics } from '@/lib/firebase/db'
import { TASK_MANAGEMENT_EPICS_COLLECTION } from '@/lib/firebase/config/constant'

export const ListContent = () => {
  const [epics, setEpics] = useState<TaskManagementEpic[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const { unsubscribe } = getEpics(
      TASK_MANAGEMENT_EPICS_COLLECTION,
      (value) => {
        setEpics((prev) => [...prev, value])
      },
    )

    const timeout = setTimeout(() => {
      setLoading(false)
    }, 800)

    return () => {
      unsubscribe()
      timeout
    }
  }, [])

  return (
    <div className='h-full w-full px-3 py-2 flex flex-col gap-2'>
      {!loading &&
        epics.map((epic) => <CollapseItem key={epic.id} epic={epic} />)}
      {loading && (
        <div className='mx-auto my-auto'>
          <div>Loading...</div>
        </div>
      )}
    </div>
  )
}
