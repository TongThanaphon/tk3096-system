'use client'

import { useRouter } from 'next/navigation'

import { Button } from '@/components/ui/button'

import { signOut } from '@/lib/firebase/auth'

const HomePage = () => {
  const router = useRouter()

  const handleSignOut = async () => {
    const res = await signOut()

    if (res) {
      router.push('/sign-in')
    }
  }

  return (
    <main>
      <Button onClick={handleSignOut}>Sign out</Button>
    </main>
  )
}

export default HomePage
