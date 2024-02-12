'use client'

import * as z from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'

import { useModal } from '@/hooks/useModal'
import { useToast } from '@/hooks/useToast'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { FileUpload } from '@/components/common/FileUpload'

import { createEpicSchema } from '@/schemas/task-management'

import { addDocument } from '@/lib/firebase/db'

const STORAGE_PATH = 'task-management/epic'

export const CreateEpicModal = () => {
  const router = useRouter()

  const { type, open, onClose } = useModal()

  const { toast } = useToast()

  const form = useForm({
    resolver: zodResolver(createEpicSchema),
    defaultValues: {
      name: '',
      description: '',
      imageUrl: '',
    },
  })

  const loading = form.formState.isSubmitting

  const isOpen = open && type === 'createEpic'

  const handleSubmitCreateEpic = async (
    values: z.infer<typeof createEpicSchema>,
  ) => {
    const id = await addDocument('epics', values)

    if (id) {
      router.push(`/task-managements/${id}`)
    } else {
      toast({
        title: 'Create epic',
        description: 'Fail to create epic',
      })
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className='bg-white text-black p-0 overflow-hidden'>
        <DialogHeader className='pt-8 px-6'>
          <DialogTitle className='text-2xl text-center font-bold'>
            Create Epic
          </DialogTitle>
          <DialogDescription className='text-center text-zinc-500'>
            Creat your epic with name, an image and description. You can awalys
            change it later.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form
            className='space-y-8'
            onSubmit={form.handleSubmit(handleSubmitCreateEpic)}
          >
            <div className='space-y-8 px-6'>
              <FormField
                control={form.control}
                name='imageUrl'
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <FileUpload
                        value={field.value}
                        onChange={field.onChange}
                        storagePath={STORAGE_PATH}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='name'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className='uppercase text-sm font-bold text-secondary/70'>
                      Epic Name <span className='text-rose-500'>*</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        disabled={loading}
                        className='bg-zinc-300/50 border-none focus-visible:ring-0 focus-visible:ring-offset-0'
                        placeholder='Your epic name'
                        {...field}
                      />
                    </FormControl>
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
