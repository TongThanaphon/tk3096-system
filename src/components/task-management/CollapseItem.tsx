'use client'

import { useState } from 'react'

import { TaskManagementEpic } from '@/types'

import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from '@/components/ui/collapsible'
import { ListItem } from '@/components/task-management/ListItem'

interface CollapseItem {
  epic: TaskManagementEpic
}

export const CollapseItem = (props: CollapseItem) => {
  const { epic } = props

  const [open, setOpen] = useState(false)

  return (
    <Collapsible open={open} onOpenChange={setOpen}>
      <CollapsibleTrigger asChild>
        <button className='w-full'>
          <ListItem label={epic.name} type='Epic' imageUrl={epic.imageUrl} />
        </button>
      </CollapsibleTrigger>
      <CollapsibleContent className='space-y-2 CollapsibleContent'>
        {[1, 2, 3].map((d) => (
          <div key={d}>
            <ListItem type='Dashboard' label='item' />
          </div>
        ))}
      </CollapsibleContent>
    </Collapsible>
  )
}
