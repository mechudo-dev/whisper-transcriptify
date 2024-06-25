'use client'

import { ACCEPTED_FILE_TYPES } from '@/lib/const'
import {
  ArrowDownToLine,
  Droplet,
  FileIcon,
  Upload,
  UploadCloud,
} from 'lucide-react'
import { Dispatch, DragEvent, DragEventHandler, SetStateAction, useState } from 'react'

export function FileInput({
  file,
  setFile,
}: {
  file: File | null
  setFile: Dispatch<SetStateAction<File | null>>
}) {
  const [drag, setDrag] = useState(false)

  const handleDragOver = (e: DragEvent) => {
    e.preventDefault();
    setDrag(true);
  };

  const handleDragLeave = (e: DragEvent) => {
    e.preventDefault()
    setDrag(false)
  }

  const handleDrop = (e: DragEvent) => {
    e.preventDefault()
    setDrag(false)
    if (e.dataTransfer && e.dataTransfer.files.length > 0) {
      setFile(e.dataTransfer.files[0])
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0])
    }
  }

  return (
    <label
      htmlFor='dropzone-file'
      className={`file-uploader border ${
        drag ? 'bg-slate-900' : 'bg-background '
      } p-4 rounded-md cursor-pointer h-32 w-full flex items-center justify-center dark:hover:bg-slate-900  hover:bg-muted border-dashed hover:border-primary hover:border-2 transition-all duration-1000`}
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
            <div className='flex flex-col items-center justify-center  p-5'>
              <UploadCloud className='w-8 h-8 mb-2' />
              <p className='mb-2 text-sm text-gray-500 dark:text-gray-400'>
                <span className='font-semibold'>Click to upload</span> or drag
                and drop
              </p>
              <p className='text-xs text-gray-500 dark:text-gray-400'>
                (types supported: .mp3, .mp4, .mpeg, .mpga, .m4a, .wav, .ogg and
                .webm)
              </p>
            </div>
          )}
          <input
            id='dropzone-file'
            type='file'
            className='hidden'
            onChange={handleChange}
            accept={ACCEPTED_FILE_TYPES}
          />
        </div>
      )}
    </label>
  )
}
