'use client'

import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import ToolBar from './ToolBar'
import Heading from '@tiptap/extension-heading'
import { Skeleton } from './ui/skeleton'
import { Dispatch, SetStateAction } from 'react'

const Editor = ({
  transcription,
  setTranscription,
}: {
  transcription: string
  setTranscription: Dispatch<SetStateAction<string>>
}) => {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        bulletList: {
          keepMarks: true,
          keepAttributes: false,
        },
        orderedList: {
          keepMarks: true,
          keepAttributes: false,
        },
      }),
      Heading.configure({
        HTMLAttributes: {
          class: 'text-xl font-bold',
          levels: [2],
        },
      }),
    ],
    content: transcription,
    editorProps: {
      attributes: {
        class: 'min-h-[150px] border-input bg-back p-2',
      },
    },
    onUpdate({ editor }) {
      setTranscription(editor.getHTML())
    },
  })

  return !editor ? (
    <div className='flex flex-col gap-y-1'>
      <div className='flex flex-row gap-2'>
        <Skeleton className='h-9 w-9' />
        <Skeleton className='h-9 w-9' />
        <Skeleton className='h-9 w-9' />
        <Skeleton className='h-9 w-9' />
      </div>
      <Skeleton className='h-[150px] w-full' />
    </div>
  ) : (
    <div className='flex flex-col justify-stretch gap-y-1'>
      <ToolBar editor={editor} />
      <div className='rounded-xl overflow-hidden border'>
        <EditorContent editor={editor} className='border-none' />
      </div>
    </div>
  )
}

export default Editor
