'use client'

import {
  ArchiveIcon,
  ChevronDownIcon,
  FileTextIcon,
  DashboardIcon,
} from '@radix-ui/react-icons'

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from '@/components/ui/dropdown-menu'
import { useModal } from '@/hooks/useModal'

export const TaskManagementHeader = () => {
  const { onOpen } = useModal()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className='focus:outline-none'>
        <button className='w-full text-md font-semibold px-3 h-12 flex items-center border-neutral-700 border-b-2 hover:bg-zinc-700/50 transition'>
          Tasks Management
          <ChevronDownIcon className='h-5 w-5 ml-auto' />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className='w-[205px] text-sm font-medium text-neutral-400 space-y-1'>
        <DropdownMenuItem
          className='cursor-pointer px-3 py-2'
          onClick={() => onOpen('createEpic')}
        >
          Create Epic
          <ArchiveIcon className='ml-auto h-5 w-5' />
        </DropdownMenuItem>
        <DropdownMenuItem className='cursor-pointer px-3 py-2'>
          Create Dashboard
          <DashboardIcon className='ml-auto h-5 w-5' />
        </DropdownMenuItem>
        <DropdownMenuItem className='cursor-pointer px-3 py-2'>
          Create Task
          <FileTextIcon className='ml-auto h-5 w-5' />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
