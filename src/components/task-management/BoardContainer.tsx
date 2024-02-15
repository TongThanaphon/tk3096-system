'use client'

import { useEffect, useState } from 'react'

import { TaskManagementBoard, TaskManagementEpic } from '@/types'

import { BoardHeader } from '@/components/task-management/BoardHeader'

import { getBoard, getEpic } from '@/lib/firebase/db'

interface BoardContainerProps {
  epicId: string
  boardId: string
}

export const BoardContainer = (props: BoardContainerProps) => {
  const { epicId, boardId } = props

  const [epic, setEpic] = useState<TaskManagementEpic | null>(null)
  const [board, setBoard] = useState<TaskManagementBoard | null>(null)

  useEffect(() => {
    const { unsubscribe } = getEpic(epicId, (value) => {
      setEpic(value)
    })

    return () => {
      unsubscribe()
    }
  }, [epicId])

  useEffect(() => {
    const { unsubscribe } = getBoard(boardId, (value) => {
      setBoard(value)
    })

    return () => {
      unsubscribe()
    }
  }, [boardId])

  if (!epic || !board) {
    return null
  }

  return (
    <div className='w-full h-full'>
      <div className='fixed w-full h-11'>
        <BoardHeader epicName={epic.name} boardName={board.name} />
      </div>
      <div className='pt-14 px-4'>
        <div>www</div>
      </div>
    </div>
  )
}
