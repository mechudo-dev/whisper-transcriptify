'use client'

import { type Editor } from '@tiptap/react'
import {
  Bold,
  Strikethrough,
  Italic,
  List,
  ListOrdered,
  Heading2,
  Heading1,
  Undo,
  Redo,
} from 'lucide-react'
import { Toggle } from './ui/toggle'
import { Button } from './ui/button'

type Props = {
  editor: Editor | null
}

const ToolBar = ({ editor }: Props) => {
  if (!editor) {
    return null
  }
  return (
    <div className='bg-transparent flex justify-between'>
      <div className='flex gap-1'>
        <Toggle
          size='sm'
          variant='outline'
          pressed={editor.isActive('heading')}
          onPressedChange={() =>
            editor.chain().focus().toggleHeading({ level: 1 }).run()
          }
        >
          <Heading1 className='h-4 w-4' />
        </Toggle>
        <Toggle
          size='sm'
          variant='outline'
          pressed={editor.isActive('bold')}
          onPressedChange={() => editor.chain().focus().toggleBold().run()}
        >
          <Bold className='h-4 w-4' />
        </Toggle>
        <Toggle
          size='sm'
          variant='outline'
          pressed={editor.isActive('italic')}
          onPressedChange={() => editor.chain().focus().toggleItalic().run()}
        >
          <Italic className='h-4 w-4' />
        </Toggle>
        <Toggle
          size='sm'
          variant='outline'
          pressed={editor.isActive('strike')}
          onPressedChange={() => editor.chain().focus().toggleStrike().run()}
        >
          <Strikethrough className='h-4 w-4' />
        </Toggle>
      </div>
      <div className='flex gap-1'>
        <Toggle
          size='sm'
          variant='outline'
          pressed={editor.isActive('undo')}
          onPressedChange={() => editor.chain().focus().undo().run()}
        >
          <Undo className='h-4 w-4' />
        </Toggle>
        <Toggle
          size='sm'
          variant='outline'
          pressed={editor.isActive('redo')}
          onPressedChange={() => editor.chain().focus().redo().run()}
        >
          <Redo className='h-4 w-4' />
        </Toggle>
      </div>
      {/* <Toggle
        size='sm'
        variant='outline'
        pressed={editor.isActive('bulletList')}
        onPressedChange={() => editor.chain().focus().toggleBulletList().run()}
      >
        <List className='h-4 w-4' />
      </Toggle>
      <Toggle
        size='sm'
        variant='outline'
        pressed={editor.isActive('orderedList')}
        onPressedChange={() => editor.chain().focus().toggleOrderedList()}
      >
        <ListOrdered className='h-4 w-4' />
      </Toggle> */}
    </div>
  )
}

export default ToolBar
