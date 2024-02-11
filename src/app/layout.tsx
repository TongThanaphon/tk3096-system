import type { Metadata } from 'next'
import { Open_Sans } from 'next/font/google'

import { Toaster } from '@/components/ui/toaster'
import { MainSidebar } from '@/components/common/MainSidebar'

import { ThemeProvider } from '@/providers/ThemeProvider'

import { cn } from '@/lib/utils'

import './globals.css'

const font = Open_Sans({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'TK3096 System',
  description: 'Management system for myself',
}

const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode
}>) => {
  return (
    <html lang='en' suppressHydrationWarning>
      <body className={cn(font.className, 'bg-white dark:bg-[#333]')}>
        <ThemeProvider
          attribute='class'
          defaultTheme='dark'
          enableSystem
          storageKey='tk3096-system'
        >
          <div className='h-full'>
            <div className='hidden md:block h-full w-[150px] fixed inset-y-0 z-30'>
              <MainSidebar />
            </div>
            <main className='md:pl-[150px] h-full'>{children}</main>
          </div>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}

export default RootLayout
