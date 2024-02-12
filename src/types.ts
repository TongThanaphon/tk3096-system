export type APIResponse<T = object> =
  | { success: true; data: T }
  | { success: false; error: string }

export type DocumentData<T> = { [field: string]: T }
