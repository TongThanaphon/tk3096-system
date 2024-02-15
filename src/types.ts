export type APIResponse<T = object> =
  | { success: true; data: T }
  | { success: false; error: string }

export interface TaskManagementEpic {
  id: string
  name: string
  imageUrl: string
  description: string
}

export interface TaskManagementBoard {
  id: string
  epicId: string
  name: string
  description: string
}

export enum TaskStatus {
  TODO,
  IN_PROGRESS,
  REVIEW,
  DONE,
}

export interface TaskManagementTask {
  id: string
  title: string
  description: string
  status: TaskStatus
  refs: string[]
  score: number
  createdAt: number
  updatedAt: number
}

export interface TaskWithIndex {
  [key: string]: TaskManagementTask[]
}
