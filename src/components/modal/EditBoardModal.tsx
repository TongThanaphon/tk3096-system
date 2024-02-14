'use client'

import { useEffect, useState } from 'react'
import qs from 'query-string'
import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
  DialogHeader,
} from '@/components/ui/dialog'
import {
  Form,
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
  FormField,
} from '@/components/ui/form'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

import { editBoardSchema } from '@/schemas/task-management'

import { useModal } from '@/hooks/useModal'
import { useToast } from '@/hooks/useToast'

import { getEpics } from '@/lib/firebase/db'

import { TaskManagementEpic } from '@/types'

export const EditBoardModal = () => {
  const router = useRouter()

  const [options, setOptions] = useState<TaskManagementEpic[]>([])

  const { toast } = useToast()
  const { type, onClose, open, data } = useModal()

  const isOpen = open && type === 'editBoard'

  const form = useForm({
    resolver: zodResolver(editBoardSchema),
    defaultValues: {
      name: '',
      epicId: options[0]?.id || '',
      description: '',
    },
  })

  const loading = form.formState.isSubmitting

  const handleClose = () => {
    form.reset()
    onClose()
  }

  const handleSubmitEditBoard = async (
    values: z.infer<typeof editBoardSchema>,
  ) => {
    try {
      const url = qs.stringifyUrl({
        url: `/api/task-management/boards/${data?.board?.id}`,
      })
      const res = await fetch(url, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      })

      if (res.ok) {
        handleClose()
        router.refresh()
      } else {
        toast({
          title: 'Edit board',
          description: 'Fail to edit board',
          variant: 'destructive',
        })
      }
    } catch (error) {
      toast({
        title: 'Something went wrong',
        description: `${error}`,
        variant: 'destructive',
      })
    }
  }

  useEffect(() => {
    const { unsubscribe } = getEpics((value) => {
      setOptions((prev) => [...prev, value])
    })

    return () => {
      unsubscribe()
    }
  }, [])

  useEffect(() => {
    if (data?.board) {
      form.setValue('name', data.board?.name)
      form.setValue('epicId', data.board?.epicId)
      form.setValue('description', data.board?.description)
    }
  }, [data, form])

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className='bg-white text-black p-0 overflow-hidden'>
        <DialogHeader className='pt-8 px-6'>
          <DialogTitle className='text-2xl text-center font-bold'>
            Edit Board
          </DialogTitle>
          <DialogDescription className='text-center text-zinc-500'>
            Edit your board with name, epic and description.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmitEditBoard)}
            className='space-y-8'
          >
            <div className='space-y-8 px-6'>
              <FormField
                control={form.control}
                name='name'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className='uppercase text-sm font-bold text-secondary/70'>
                      Board Name <span className='text-rose-500'>*</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        disabled={loading}
                        className='bg-zinc-300/50 border-none focus-visible:ring-0 focus-visible:ring-offset-0'
                        placeholder='Your board name'
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='epicId'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className='uppercase text-sm font-bold text-secondary/70'>
                      Epic <span className='text-rose-500'>*</span>
                    </FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className='bg-zinc-300/50 border-none focus-visible:ring-0 focus-visible:ring-offset-0'>
                          <SelectValue placeholder='Select the epic' />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {options.map((option) => (
                          <SelectItem key={option.id} value={option.id}>
                            {option.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='description'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className='uppercase text-sm font-bold text-secondary/70'>
                      Description
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        disabled={loading}
                        className='bg-zinc-300/50 border-none focus-visible:ring-0 focus-visible:ring-offset-0 resize-none'
                        placeholder='Your description'
                        rows={3}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <DialogFooter className='bg-gray-100 px-6 py-4'>
              <Button
                type='submit'
                variant='primary'
                disabled={loading || !form.formState.isDirty}
              >
                Create
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
