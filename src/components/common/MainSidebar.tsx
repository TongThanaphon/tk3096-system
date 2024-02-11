import { ModeToggle } from '@/components/common/ModeToggle'
import { Separator } from '@/components/ui/separator'
import { ScrollArea } from '@/components/ui/scroll-area'
import { MainSidebarItem } from '@/components/common/MainSidebarItem'
import { SignOutBtn } from '@/components/common/SignOutBtn'

export const MainSidebar = () => {
  return (
    <div className='bg-[#f6f6f6] dark:bg-[#262626] h-full flex flex-col gap-2 py-2'>
      <div className='flex justify-center'>
        <ModeToggle />
      </div>
      <Separator className='h-[2px] w-3/4 mx-auto rounded-md bg-[#e1e2e5] dark:bg-neutral-700' />
      <ScrollArea className='flex-1 w-full'>
        <MainSidebarItem label='task management' path='/task-management' />
      </ScrollArea>
      <Separator className='h-[2px] w-3/4 mx-auto rounded-md bg-[#e1e2e5] dark:bg-neutral-700' />
      <SignOutBtn />
    </div>
  )
}
