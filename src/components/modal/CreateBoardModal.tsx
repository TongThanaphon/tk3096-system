'use client'

import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

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

import { createBoardSchema } from '@/schemas/task-management'
import { useModal } from '@/hooks/useModal'

const OPTIONS = [
  {
    id: 'epic-1',
    name: 'Epic 1',
  },
  {
    id: 'epic-2',
    name: 'Epic 2',
  },
  {
    id: 'epic-3',
    name: 'Epic 3',
  },
]

export const CreateBoardModal = () => {
  const { type, onClose, open } = useModal()

  const form = useForm({
    resolver: zodResolver(createBoardSchema),
    defaultValues: {
      name: '',
      epic: '',
      description: '',
    },
  })

  const isOpen = open && type === 'createBoard'
  const loading = form.formState.isSubmitting

  const handleClose = () => {
    form.reset()
    onClose()
  }

  const handleSubmitCreateBoard = async (
    values: z.infer<typeof createBoardSchema>,
  ) => {
    console.log(values)
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className='bg-white text-black p-0 overflow-hidden'>
        <DialogHeader className='pt-8 px-6'>
          <DialogTitle className='text-2xl text-center font-bold'>
            Create Board
          </DialogTitle>
          <DialogDescription className='text-center text-zinc-500'>
            Create your board with name, epic and description. You can awalys
            change it later.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmitCreateBoard)}
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
                name='epic'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className='uppercase text-sm font-bold text-secondary/70'>
                      Epic <span className='text-rose-500'>*</span>
                    </FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={OPTIONS[0].id}
                    >
                      <FormControl>
                        <SelectTrigger className='bg-zinc-300/50 border-none focus-visible:ring-0 focus-visible:ring-offset-0'>
                          <SelectValue placeholder='Select the epic' />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {OPTIONS.map((option) => (
                          <SelectItem key={option.id} value={option.id}>
                            {option.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
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
