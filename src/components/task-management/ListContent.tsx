'use client'

import { useEffect, useState } from 'react'

import { TaskManagementBoard, TaskManagementEpic } from '@/types'

import { CollapseItem } from '@/components/task-management/CollapseItem'

import { getBoards, getEpics } from '@/lib/firebase/db'

export interface EpicWithBoard {
  [epicId: string]: TaskManagementBoard[]
}

export const ListContent = () => {
  const [epics, setEpics] = useState<TaskManagementEpic[]>([])
  const [boards, setBoards] = useState<EpicWithBoard>()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const { unsubscribe } = getEpics((value) => {
      setEpics((prev) => {
        const existingEpic = prev.find((epic) => epic.id === value.id)

        if (existingEpic) {
          return prev
        }

        return [...prev, value]
      })
    })

    const timeout = setTimeout(() => {
      setLoading(false)
    }, 800)

    return () => {
      unsubscribe()
      clearTimeout(timeout)
    }
  }, [])

  useEffect(() => {
    const { unsubscribe } = getBoards((value) => {
      setBoards((prev) => {
        const existingBoard = prev?.[value.epicId]?.find(
          (board) => board.id === value.id,
        )

        if (existingBoard) {
          return prev
        }

        return {
          ...prev,
          [value.epicId]: prev?.[value.epicId]
            ? [...prev[value.epicId], value]
            : [value],
        }
      })
    })

    return () => {
      unsubscribe()
    }
  }, [])

  if (loading) {
    return (
      <div className='mx-auto my-auto'>
        <div>Loading...</div>
      </div>
    )
  }

  return (
    <div className='h-full w-full px-3 py-2 flex flex-col gap-2'>
      {epics.map((epic) => (
        <CollapseItem key={epic.id} epic={epic} boards={boards} />
      ))}
    </div>
  )
}
