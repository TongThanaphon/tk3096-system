import { NextRequest, NextResponse } from 'next/server'
import * as z from 'zod'

import { APIResponse } from '@/types'

import { createEpicSchema } from '@/schemas/task-management'

import { addDocument } from '@/lib/firebase/config/firebase-admin'
import { TASK_MANAGEMENT_EPICS_COLLECTION } from '@/lib/firebase/config/constant'

export const POST = async (req: NextRequest) => {
  try {
    const body = (await req.json()) as z.infer<typeof createEpicSchema>

    const docId = await addDocument(body, TASK_MANAGEMENT_EPICS_COLLECTION)

    if (!docId) {
      NextResponse.json<APIResponse>(
        {
          success: false,
          error: 'Fail to add document',
        },
        { status: 400 },
      )
    }

    return NextResponse.json<APIResponse<string>>({
      success: true,
      data: docId!,
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
