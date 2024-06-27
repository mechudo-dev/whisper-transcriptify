import Link from 'next/link'
import { ArrowLeft, TrafficCone } from 'lucide-react'
import { buttonVariants } from '@/components/ui/button'

export default function NotFound() {
  return (
    <div className='relative min-h-screen flex flex-col items-center justify-center gap-y-2 w-full'>
      <div className='relative mb-4 h-32 w-32 text-muted-foreground'>
        <TrafficCone className='w-full h-full' />
      </div>
      <h3 className='tracking-widest text-2xl'>YOU GOT LOST.</h3>
      <p className='text-muted-foreground text-center'>
        The page you are looking for could not be found.
      </p>
      <Link
        className={buttonVariants({
          variant: 'link',
          className: 'gap-1.5 text-white',
        })}
        href='/'
      >
        <ArrowLeft className='h-4 w-4' />
        Return to a safe place.
      </Link>
    </div>
  )
}
