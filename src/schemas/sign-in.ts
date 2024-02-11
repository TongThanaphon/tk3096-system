import * as z from 'zod'

export const signInSchema = z.object({
  email: z
    .string()
    .min(1, {
      message: 'Email is required',
    })
    .email('Email is not a valid'),
  password: z.string().min(1, {
    message: 'Password is required',
  }),
})
