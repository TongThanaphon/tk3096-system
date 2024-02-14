'use client'

import Image from 'next/image'
import { Pencil1Icon, ArchiveIcon, PlusIcon } from '@radix-ui/react-icons'

import { ModalData, ModalType, useModal } from '@/hooks/useModal'

import { ActionTooltip } from '@/components/common/ActionTooltip'

import { cn } from '@/lib/utils'

import { TaskManagementBoard, TaskManagementEpic } from '@/types'

interface ListItemProps {
  type: 'Epic' | 'Board'
  data: TaskManagementEpic | TaskManagementBoard
}

const epicIcon = (label: string, imageUrl?: string) => {
  if (imageUrl) {
    return (
      <div className='relative w-4 h-4 overflow-hidden rounded-md'>
        <Image src={imageUrl} fill alt={label} />
      </div>
    )
  }

  return <ArchiveIcon className='w-4 h-4' />
}

export const ListItem = (props: ListItemProps) => {
  const { type, data } = props

  const { onOpen } = useModal()

  const label = type === 'Epic' ? (data as TaskManagementEpic).name : data.name
  const imageUrl =
    type === 'Epic' ? (data as TaskManagementEpic).imageUrl : undefined
  const editType = type === 'Epic' ? 'editEpic' : 'editBoard'

  const handleAction = (event: React.MouseEvent, action: ModalType) => {
    event.stopPropagation()

    if (editType === 'editEpic') {
      onOpen(action, { epic: data as TaskManagementEpic })
    } else if (editType === 'editBoard') {
      onOpen(action, { board: data as TaskManagementBoard })
    } else {
      onOpen(action, { epic: data as TaskManagementEpic })
    }
  }

  return (
    <div
      className={cn(
        'flex items-center w-full p-2 rounded-md cursor-pointer group transition-colors',
        type === 'Epic' &&
          'border-b-2 border-solid border-neutral-700 bg-neutral-900',
        type === 'Board' && 'pl-5 bg-neutral-800',
      )}
    >
      <div className='flex items-center gap-2 text-sm group-hover:text-zinc-300'>
        {type === 'Epic' && epicIcon(label, imageUrl)}
        {label}
      </div>
      <div className='ml-auto flex gap-3'>
        <ActionTooltip label='edit' align='center'>
          <Pencil1Icon
            className='h-4 w-4'
            onClick={(e) => handleAction(e, editType as ModalType)}
          />
        </ActionTooltip>

        {type === 'Epic' && (
          <ActionTooltip label='new' align='center'>
            <PlusIcon
              className='h-4 w-4'
              onClick={(e) => handleAction(e, 'createBoard')}
            />
          </ActionTooltip>
        )}
      </div>
    </div>
  )
}
