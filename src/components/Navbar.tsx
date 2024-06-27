'use client'

import Link from 'next/link'
import { ModeToggle } from './ModeToggle'

const Navbar = () => {
  return (
    <div className='z-50 top-0 inset-x-0 items-center  w-full flex justify-between p-2 fixed backdrop-blur supports-[backdrop-filter]:bg-background/70 border-b'>
      <div className='flex flex-row px-4 py-1'>
        <Link href='/' className='flex flex-row justify-center'>
          <p className='text-4xl font-black text-center text-primary pr-2'>
            transcrip
            <span className='text-black dark:text-white'>tify</span>
          </p>
        </Link>
      </div>
      <div className='sm:flex flex-row justify-end gap-2 px-1 '>
        <ModeToggle />
      </div>
    </div>
  )
}

export default Navbar
