'use client'

import { useToast } from '@/hooks/useToast'

const TaskManagementPage = () => {
  const { toast } = useToast()

  return (
    <div>
      <div>task management</div>
      <button
        onClick={() =>
          toast({ variant: 'destructive', title: 'test', description: 'hello' })
        }
      >
        Click
      </button>
    </div>
  )
}

export default TaskManagementPage
