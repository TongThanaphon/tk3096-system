import { NextRequest, NextResponse } from 'next/server'
import * as z from 'zod'

import { APIResponse } from '@/types'

import {
  isUserAuthenticated,
  updateDocument,
} from '@/lib/firebase/config/firebase-admin'
import { TASK_MANAGEMENT_EPICS_COLLECTION } from '@/lib/firebase/config/constant'

import { editEpicSchema } from '@/schemas/task-management'

export const PATCH = async (
  req: NextRequest,
  { params }: { params: { epicId: string } },
) => {
  try {
    const { epicId } = params
    const user = await isUserAuthenticated()
    const body = (await req.json()) as z.infer<typeof editEpicSchema>

    if (!user) {
      return NextResponse.json<APIResponse>(
        {
          success: false,
          error: 'Unauthorized',
        },
        { status: 401 },
      )
    }

    if (!epicId) {
      return NextResponse.json<APIResponse>(
        { success: false, error: 'Epic id missing' },
        { status: 400 },
      )
    }

    const updated = await updateDocument(
      epicId,
      body,
      TASK_MANAGEMENT_EPICS_COLLECTION,
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
      data: epicId,
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
