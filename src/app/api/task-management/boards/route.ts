import { NextRequest, NextResponse } from 'next/server'
import * as z from 'zod'

import { APIResponse } from '@/types'

import {
  addDocument,
  isUserAuthenticated,
} from '@/lib/firebase/config/firebase-admin'

import { TASK_MANAGEMENT_BOARDS_COLLECTION } from '@/lib/firebase/config/constant'

import { createBoardSchema } from '@/schemas/task-management'

export const POST = async (req: NextRequest) => {
  try {
    const body = (await req.json()) as z.infer<typeof createBoardSchema>

    const user = await isUserAuthenticated()

    if (!user) {
      return NextResponse.json<APIResponse>(
        {
          success: false,
          error: 'Unauthorized',
        },
        { status: 401 },
      )
    }

    const docId = await addDocument(body, TASK_MANAGEMENT_BOARDS_COLLECTION)

    if (!docId) {
      return NextResponse.json<APIResponse>(
        {
          success: false,
          error: 'Fail to create board',
        },
        { status: 500 },
      )
    }

    return NextResponse.json<APIResponse<string>>({
      success: true,
      data: docId,
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
