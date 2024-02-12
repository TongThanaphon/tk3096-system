'use client'

import { useRouter } from 'next/navigation'

import { ExitIcon } from '@radix-ui/react-icons'

import { Button } from '@/components/ui/button'

import { useToast } from '@/hooks/useToast'

import { signOut } from '@/lib/firebase/auth'

export const SignOutBtn = () => {
  const { toast } = useToast()

  const router = useRouter()

  const handleSignOut = async () => {
    try {
      const res = await signOut()

      if (res) {
        router.push('/sign-in')
      } else {
        toast({
          title: 'Sign out',
          description: 'Fail to sign out',
          variant: 'destructive',
        })
      }
    } catch (error) {
      toast({
        title: 'Something went wrong',
        description: `${error}`,
        variant: 'destructive',
      })
    }
  }

  return (
    <div className='flex justify-center'>
      <Button
        size='sm'
        variant='ghost'
        className='hover:text-zinc-400 '
        onClick={handleSignOut}
      >
        <ExitIcon className='w-5 h-5 mr-2' />
        Sign out
      </Button>
    </div>
  )
}
