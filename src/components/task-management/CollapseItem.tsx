'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

import { TaskManagementEpic } from '@/types'

import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from '@/components/ui/collapsible'
import { ListItem } from '@/components/task-management/ListItem'

import { EpicWithBoard } from '@/components/task-management/ListContent'

interface CollapseItem {
  epic: TaskManagementEpic
  boards?: EpicWithBoard
}

export const CollapseItem = (props: CollapseItem) => {
  const { epic, boards } = props

  const router = useRouter()
  const [open, setOpen] = useState(false)

  const handleClickBoardItem = (boardId: string) => {
    router.push(`/tasks-management/${epic.id}/${boardId}`)
  }

  return (
    <Collapsible open={open} onOpenChange={setOpen}>
      <CollapsibleTrigger asChild>
        <button className='w-full'>
          <ListItem type='Epic' data={epic} />
        </button>
      </CollapsibleTrigger>
      <CollapsibleContent className='space-y-2 CollapsibleContent flex flex-col'>
        {boards &&
          boards[epic.id]?.map((board) => (
            <button
              key={board.id}
              onClick={() => handleClickBoardItem(board.id)}
            >
              <ListItem type='Board' data={board} />
            </button>
          ))}
      </CollapsibleContent>
    </Collapsible>
  )
}
