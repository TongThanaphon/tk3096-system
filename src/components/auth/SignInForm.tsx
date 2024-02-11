'use client'

import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useToast } from '@/components/ui/use-toast'

import { signInWithEmail } from '@/lib/firebase/auth'

import { signInSchema } from '@/schemas/sign-in'

export const SignInForm = () => {
  const router = useRouter()

  const { toast } = useToast()

  const form = useForm({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const loading = form.formState.isSubmitting
  const isDirty = form.formState.isDirty

  const handleSubmitSignIn = async (values: z.infer<typeof signInSchema>) => {
    try {
      const { email, password } = values

      const res = await signInWithEmail(email, password)

      if (res) {
        router.push('/')
      } else {
        toast({
          title: 'Sign in',
          description: 'Fail to sing int',
        })
      }
    } catch (error) {
      toast({
        title: 'Something went wrong',
        description: `${error}`,
      })
    }
  }

  return (
    <div>
      <Form {...form}>
        <form
          className='space-y-3'
          onSubmit={form.handleSubmit(handleSubmitSignIn)}
        >
          <FormField
            control={form.control}
            name='email'
            render={({ field }) => (
              <FormItem>
                <FormLabel className='uppercase text-sm font-bold text-zinc-500 dark:text-zinc-200'>
                  Email
                </FormLabel>
                <FormControl>
                  <Input
                    disabled={loading}
                    type='email'
                    placeholder='Your email'
                    className='bg-zinc-300/50 border-none focus-visible:ring-0 focus-visible:ring-offset-0'
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='password'
            render={({ field }) => (
              <FormItem>
                <FormLabel className='uppercase text-sm font-bold text-zinc-500 dark:text-zinc-200'>
                  Password
                </FormLabel>
                <FormControl>
                  <Input
                    disabled={loading}
                    type='password'
                    placeholder='Your password'
                    className='bg-zinc-300/50 border-none'
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className='pt-8'>
            <Button
              disabled={loading || !isDirty}
              className='capitalize w-full bg-indigo-500 hover:bg-indigo-400 text-white'
              type='submit'
            >
              sign in
            </Button>
          </div>
        </form>
      </Form>
    </div>
  )
}
