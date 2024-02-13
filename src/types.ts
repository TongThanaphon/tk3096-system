export type APIResponse<T = object> =
  | { success: true; data: T }
  | { success: false; error: string }

export interface TaskManagementEpic {
  id: string
  name: string
  imageUrl: string
  description: string
}
