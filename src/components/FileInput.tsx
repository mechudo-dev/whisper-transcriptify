'use client'

import { ACCEPTED_FILE_TYPES, EXPORT_FORMATS } from '@/lib/const'
import {
  ArrowDownToLine,
  Droplet,
  FileIcon,
  Upload,
  UploadCloud,
} from 'lucide-react'
import {
  Dispatch,
  DragEvent,
  DragEventHandler,
  SetStateAction,
  useState,
} from 'react'
import { useToast } from './ui/use-toast'

export const acceptedFileTypes =
  'mp3,.mp4,.mpeg,.mpga,.m4a,.wav,.ogg,.webm;max-size=25MB'

export function FileInput({
  file,
  setFile,
}: {
  file: File | null
  setFile: Dispatch<SetStateAction<File | null>>
}) {
  const { toast } = useToast()
  const [drag, setDrag] = useState(false)

  const handleDragOver = (e: DragEvent) => {
    e.preventDefault()
    setDrag(true)
  }

  const handleDragLeave = (e: DragEvent) => {
    e.preventDefault()
    setDrag(false)
  }

  const handleDrop = (e: DragEvent) => {
    e.preventDefault()
    setDrag(false)
    const file = e.dataTransfer.files[0]
    if (file && isValidFile(file)) {
      setFile(file)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      if (isValidFile(file)) {
        setFile(file)
      }
    }
  }

  const isValidFile = (file: File) => {
    if (file.size > 25 * 1024 * 1024) {
      toast({
        variant: 'destructive',
        title: 'File size exceeds the maximum limit of 25MB.',
        description: 'Select a file with a size less than 25MB.',
      })
      return false
    }
    return true
  }

  return (
    <label
      htmlFor='dropzone-file'
      className={`file-uploader border ${
        drag ? 'bg-slate-900' : 'bg-background '
      } p-2 sm:p-4 rounded-md cursor-pointer h-32 w-full flex items-center justify-center dark:hover:bg-slate-900  hover:bg-muted border-dashed hover:border-primary hover:border-2 transition-all duration-1000`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      {file ? (
        <div className='file-info flex flex-col items-center justify-center  p-5'>
          <FileIcon className='w-8 h-8 mb-2' />
          <span>File Selected: </span>
          <span>{file.name}</span>
        </div>
      ) : (
        <div className='file-input flex flex-col items-center justify-center'>
          {drag ? (
            <div className=' p-5 border-dashed'>
              <div className='animate-pulse duration-1000 flex flex-col items-center justify-center'>
                <ArrowDownToLine className='w-8 h-8 mb-2' />
                <span className='text-primary'>Drop it</span>
              </div>
            </div>
          ) : (
            <div className='flex flex-col items-center justify-center sm:p-5'>
              <UploadCloud className='sm:w-8 sm:h-8 w-6 h-6 mb-2' />
              <p className='text-center mb-2 text-xs sm:text-sm text-gray-500 dark:text-gray-400'>
                <span className='font-semibold'>Click to upload</span> or drag
                and drop
              </p>
              <p className='text-center text-xs text-gray-500 dark:text-gray-400'>
                (types supported: .mp3, .mp4, .mpeg, .mpga, .m4a, .wav, .ogg and
                .webm)
              </p>
            </div>
          )}
          <input
            id='dropzone-file'
            type='file'
            className='hidden'
            multiple={false}
            onChange={handleChange}
            accept={acceptedFileTypes}
          />
        </div>
      )}
    </label>
  )
}
