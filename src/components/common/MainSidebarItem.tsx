'use client'

import { useRouter } from 'next/navigation'

import { Button } from '@/components/ui/button'

interface MainSidebarItemProps {
  label: string
  path: string
}

export const MainSidebarItem = (props: MainSidebarItemProps) => {
  const { label, path } = props

  const router = useRouter()

  const handleClick = () => {
    router.push(path)
  }

  return (
    <div className='flex justify-center'>
      <Button
        className='capitalize text-center hover:text-zinc-400'
        size='sm'
        variant='ghost'
        onClick={handleClick}
      >
        {label}
      </Button>
    </div>
  )
}
