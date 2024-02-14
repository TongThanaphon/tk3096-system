import { NextRequest, NextResponse } from 'next/server'
import * as z from 'zod'

import { APIResponse } from '@/types'

import {
  isUserAuthenticated,
  updateDocument,
} from '@/lib/firebase/config/firebase-admin'
import { TASK_MANAGEMENT_BOARDS_COLLECTION } from '@/lib/firebase/config/constant'

import { editBoardSchema } from '@/schemas/task-management'

export const PATCH = async (
  req: NextRequest,
  { params }: { params: { boardId: string } },
) => {
  try {
    const { boardId } = params
    const user = await isUserAuthenticated()
    const body = (await req.json()) as z.infer<typeof editBoardSchema>

    if (!user) {
      return NextResponse.json<APIResponse>(
        {
          success: false,
          error: 'Unauthorized',
        },
        { status: 401 },
      )
    }

    if (!boardId) {
      return NextResponse.json<APIResponse>(
        { success: false, error: 'Board id missing' },
        { status: 400 },
      )
    }

    const updated = await updateDocument(
      boardId,
      body,
      TASK_MANAGEMENT_BOARDS_COLLECTION,
    )

    if (!updated) {
      return NextResponse.json<APIResponse>(
        {
          success: false,
          error: 'Fail to update document',
        },
        { status: 400 },
      )
    }

    return NextResponse.json<APIResponse<string>>({
      success: true,
      data: boardId,
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
