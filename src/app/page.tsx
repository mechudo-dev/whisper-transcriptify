'use client'

import { TranscriptCard } from '@/components/TranscriptCard'

export default function Home() {
  return (
    <main className='flex min-h-screen flex-col items-center justify-center py-10 px-5 gap-10 mt-16 '>
      <h1 className='text-3xl font-extrabold leading-tight tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl text-center max-w-[900px]'>
        Easily obtain the <span className='text-primary'>transcription</span> of
        your <span className='text-primary'>audio files</span>.
      </h1>
      <TranscriptCard />
    </main>
  )
}
// 