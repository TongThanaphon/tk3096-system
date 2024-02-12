'use client'

import { useEffect, useState } from 'react'

import { CreateEpicModal } from '@/components/modal/CreateEpicModal'

export const ModalProvider = () => {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [mounted])

  if (!mounted) return null

  return (
    <>
      <CreateEpicModal />
    </>
  )
}
