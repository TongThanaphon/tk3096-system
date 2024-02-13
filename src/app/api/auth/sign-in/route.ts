import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'

import { createSessionCookie } from '@/lib/firebase/config/firebase-admin'
import { SESSION_KEY } from '@/lib/firebase/config/constant'

import { APIResponse } from '@/types'

export const POST = async (req: NextRequest) => {
  try {
    const reqBody = (await req.json()) as { idToken: string }
    const { idToken } = reqBody

    const expiresIn = 60 * 60 * 24 * 5 * 1000

    const sessionCookie = await createSessionCookie(idToken, { expiresIn })

    cookies().set(SESSION_KEY, sessionCookie, {
      maxAge: expiresIn,
      httpOnly: true,
      secure: true,
    })

    return NextResponse.json<APIResponse<string>>({
      success: true,
      data: 'Sign in successfully',
    })
  } catch (error) {
    return NextResponse.json<APIResponse>(
      {
        success: false,
        error: `${error}`,
      },
      { status: 500 },
    )
  }
}
