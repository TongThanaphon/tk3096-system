import { MainSidebar } from '@/components/common/MainSidebar'

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className='h-full'>
      <div className='hidden md:block h-full w-[150px] fixed inset-y-0 z-30'>
        <MainSidebar />
      </div>
      <main className='md:pl-[150px] h-full'>{children}</main>
    </div>
  )
}

export default MainLayout
