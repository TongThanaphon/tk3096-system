'use client'

import Image from 'next/image'
import { useState, useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import { UploadIcon, Cross2Icon } from '@radix-ui/react-icons'

import { useToast } from '@/hooks/useToast'

import { uploadFile } from '@/lib/firebase/storage'

interface FileUploadProps {
  value?: string
  onChange: (url: string) => void
  storagePath: string
}

export const FileUpload = (props: FileUploadProps) => {
  const { value, onChange, storagePath } = props

  const { toast } = useToast()

  const [preview, setPreview] = useState<string>(value || '')

  const onDrop = useCallback(
    async (acceptFiles: File[]) => {
      const url = await uploadFile(acceptFiles[0], storagePath)

      if (url) {
        setPreview(url)
        onChange(url)
      } else {
        setPreview('')
        onChange('')

        toast({
          title: 'Upload file',
          description: 'Fail to upload file',
        })
      }
    },
    [onChange, storagePath, toast],
  )

  const { getInputProps, getRootProps } = useDropzone({
    onDrop,
    accept: {
      'image/*': [],
    },
    maxFiles: 1,
  })

  const handeClickRemove = () => {
    setPreview('')
  }

  return (
    <div>
      {!preview && (
        <div
          {...getRootProps()}
          className='border-dashed border-2 border-zinc-300 rounded-md p-4 flex flex-col items-center gap-3 text-zinc-400'
        >
          <input {...getInputProps()} />
          <UploadIcon className='h-[32px] w-[32px]' />
          <p className='text-sm'>
            Drag &apos;n&apos; drop some files here, or click to select file
          </p>
        </div>
      )}
      {preview && (
        <div className='flex justify-center items-center'>
          <div className='relative h-[72px] w-[72px]'>
            <Image src={preview} alt='preview' fill className='rounded-full' />
            <div className='absolute top-0 right-0 z-50 rounded-full bg-red-500 text-white p-1'>
              <button
                className='flex justify-center items-center'
                onClick={handeClickRemove}
              >
                <Cross2Icon className='w-[12px] h-[12px]' />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
