'use client'

import { useEffect, useState } from 'react'

import { CreateEpicModal } from '@/components/modal/CreateEpicModal'
import { CreateBoardModal } from '@/components/modal/CreateBoardModal'
import { EditEpicModal } from '@/components/modal/EditEpicModal'
import { EditBoardModal } from '@/components/modal/EditBoardModal'

export const ModalProvider = () => {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [mounted])

  if (!mounted) return null

  return (
    <>
      <CreateEpicModal />
      <CreateBoardModal />
      <EditEpicModal />
      <EditBoardModal />
    </>
  )
}
