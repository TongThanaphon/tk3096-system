import * as z from 'zod'

export const createEpicSchema = z.object({
  name: z.string().min(1, {
    message: 'Name is required',
  }),
  description: z.string(),
  imageUrl: z.string(),
})
