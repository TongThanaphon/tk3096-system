import { TaskManagementHeader } from '@/components/task-management/TaskManagementHeader'

export const Sidebar = () => {
  return (
    <div className='flex flex-col h-full w-full bg-[#262626]/70'>
      <TaskManagementHeader />
    </div>
  )
}

export default Sidebar
