import { NextRequest, NextResponse } from 'next/server'

import { SESSION_KEY } from '@/lib/firebase/config/session-key'

export const middleware = (req: NextRequest) => {
  const session = req.cookies.get(SESSION_KEY)

  if (!session && req.nextUrl.pathname !== '/sign-in') {
    return NextResponse.redirect(new URL('/sign-in', req.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|sign-in).*)'],
}
