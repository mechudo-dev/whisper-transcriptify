import { Loader2 } from 'lucide-react'

const Loader = () => {
  return (
    <div className='flex flex-col items-center gap-2 py-10 sm:m-10  m-6'>
      <div className='animate-pulse relative text-muted-foreground'>
        <p className='text-4xl font-black text-center'>
          transcriptify
        </p>
      </div>
      <Loader2 className='animate-spin h-8 w-8 text-zinc-300' />
      <h3 className='tracking-widest text-2xl'>Loading</h3>
      <p className='text-muted-foreground text-center'>
        This won&apos;t take long.
      </p>
    </div>
  )
}

export default Loader
