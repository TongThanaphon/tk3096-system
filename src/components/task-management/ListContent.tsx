'use client'

import { useEffect, useState } from 'react'

import { TaskManagementEpic } from '@/types'

import { CollapseItem } from '@/components/task-management/CollapseItem'

import { getEpics } from '@/lib/firebase/db'
import { TASK_MANAGEMENT_EPICS_COLLECTION } from '@/lib/firebase/config/constant'

export const ListContent = () => {
  const [epics, setEpics] = useState<TaskManagementEpic[]>([])

  useEffect(() => {
    const { unsubscribe } = getEpics(
      TASK_MANAGEMENT_EPICS_COLLECTION,
      (value) => {
        setEpics((prev) => [...prev, value])
      },
    )

    return () => {
      unsubscribe()
    }
  }, [])

  return (
    <div className='w-full px-3 py-2 flex flex-col gap-2'>
      {epics.map((epic) => (
        <CollapseItem key={epic.id} epic={epic} />
      ))}
    </div>
  )
}
