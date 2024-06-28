'use client'

import AdBanner from '@/components/AdBanner'
import { TranscriptCard } from '@/components/TranscriptCard'

export default function Home() {
  return (
    <main className='flex min-h-screen flex-col items-center justify-center  py-10 px-5 gap-10 mt-16'>
      <h1 className='text-3xl font-extrabold leading-tight tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl text-center sm:max-w-[900px]'>
        Easily obtain the <span className='text-primary'>transcription</span> of
        your <span className='text-primary'>audio files</span>.
      </h1>
      <div className='flex sm:flex-row gap-2 items-center flex-col'>
        <div className='flex flex-row gap-4 justify-center items-center'>
          <div className='bg-white w-28 h-96'>
            <AdBanner
              dataAdFormat='auto'
              dataAdSlot='9212563774'
              dataFullWidthResponsive={true}
            />
          </div>
          <TranscriptCard />
          <div className='bg-white w-28 h-96'>
            <AdBanner
              dataAdFormat='auto'
              dataAdSlot='9212563774'
              dataFullWidthResponsive={true}
            />
          </div>
        </div>
      </div>
    </main>
  )
}
