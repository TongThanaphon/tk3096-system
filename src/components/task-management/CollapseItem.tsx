'use client'

import { useState } from 'react'

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

  const [open, setOpen] = useState(false)

  return (
    <Collapsible open={open} onOpenChange={setOpen}>
      <CollapsibleTrigger asChild>
        <button className='w-full'>
          <ListItem type='Epic' data={epic} />
        </button>
      </CollapsibleTrigger>
      <CollapsibleContent className='space-y-2 CollapsibleContent'>
        {boards &&
          boards[epic.id]?.map((board) => (
            <div key={board.id}>
              <ListItem type='Board' data={board} />
            </div>
          ))}
      </CollapsibleContent>
    </Collapsible>
  )
}
