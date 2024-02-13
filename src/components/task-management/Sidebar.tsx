import { Header } from '@/components/task-management/Header'
import { ListContent } from '@/components/task-management/ListContent'

export const Sidebar = () => {
  return (
    <div className='flex flex-col h-full w-full bg-[#262626]/70'>
      <Header />
      <ListContent />
    </div>
  )
}

export default Sidebar
