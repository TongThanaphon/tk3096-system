import { create } from 'zustand'

import { TaskManagementBoard, TaskManagementEpic } from '@/types'

export type ModalType = 'createEpic' | 'createBoard' | 'editEpic' | 'editBoard'

export interface ModalData {
  epic?: TaskManagementEpic
  board?: TaskManagementBoard
}

interface ModalStore {
  type: ModalType | null
  open: boolean
  data?: ModalData
  onOpen: (type: ModalType | null, data?: ModalData) => void
  onClose: () => void
}

export const useModal = create<ModalStore>((set) => ({
  type: null,
  open: false,
  onOpen: (type: ModalType | null, data?: ModalData) =>
    set({ open: true, type, data }),
  onClose: () => set({ open: false, type: null, data: undefined }),
}))
