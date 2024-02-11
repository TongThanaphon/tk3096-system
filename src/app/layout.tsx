import type { Metadata } from 'next'
import { Open_Sans } from 'next/font/google'

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
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}

export default RootLayout
