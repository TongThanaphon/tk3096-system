import Sidebar from '@/components/task-management/Sidebar'

const TasksManagementLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className='h-full'>
      <div className='hidden md:block h-full w-[300px] fixed inset-y-0 z-30'>
        <Sidebar />
      </div>
      <main className='md:pl-[300px] h-full'>{children}</main>
    </div>
  )
}

export default TasksManagementLayout
