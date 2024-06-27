'use client'

import { TranscriptCard } from '@/components/TranscriptCard'
import Script from 'next/script'

export default function Home() {
  return (
    <main className='flex min-h-screen flex-col items-center justify-center  '>
      <div className='flex flex-row gap-2 items-center sm:flex-col'>
        <div className='w-24 bg-black'>
          <Script
            async
            src='https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8574483971880465'
            crossOrigin='anonymous'
          ></Script>
          <ins
            className='adsbygoogle display:block'
            data-ad-client='ca-pub-8574483971880465'
            data-ad-slot='9212563774'
            data-ad-format='auto'
            data-full-width-responsive='true'
          ></ins>
          {/* <Script>(adsbygoogle = window.adsbygoogle || []).push({});</Script> */}
        </div>
        <div className='flex flex-col items-center justify-center py-10 px-5 gap-10 mt-16'>
          <h1 className='text-3xl font-extrabold leading-tight tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl text-center max-w-[900px]'>
            Easily obtain the{' '}
            <span className='text-primary'>transcription</span> of your{' '}
            <span className='text-primary'>audio files</span>.
          </h1>
          <TranscriptCard />
        </div>
        {/* <div className='w-24 bg-black'>
          <script
            async
            src='https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8574483971880465'
            crossOrigin='anonymous'
          ></script>
          <ins
            className='adsbygoogle display:block'
            data-ad-client='ca-pub-8574483971880465'
            data-ad-slot='9212563774'
            data-ad-format='auto'
            data-full-width-responsive='true'
          ></ins>
          <script>(adsbygoogle = window.adsbygoogle || []).push({});</script>
        </div> */}
      </div>
    </main>
  )
}
//
