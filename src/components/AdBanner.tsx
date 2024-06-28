'use client'

import Script from 'next/script'
import { useEffect } from 'react'

function AdBanner({
  dataAdSlot,
  dataAdFormat,
  dataFullWidthResponsive,
}: {
  dataAdSlot: string
  dataAdFormat: string
  dataFullWidthResponsive: boolean
}) {
  useEffect(() => {
    try {
      ;((window as any).adsbygoogle = (window as any).adsbygoogle || []).push(
        {}
      )
    } catch (error: any) {
      console.log(error)
    }
  }, [])
  return (
    <ins
      className='adsbygoogle block w-full h-full'
      data-ad-client='ca-pub-8574483971880465'
      data-ad-slot={dataAdSlot}
      data-ad-format={dataAdFormat}
      data-full-width-responsive={dataFullWidthResponsive.toString()}
    />
  )
}

export default AdBanner
