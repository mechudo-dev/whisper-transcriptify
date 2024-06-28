'use client'

import Script from 'next/script'

function AdSense({ pId }: { pId: string }) {
  return (
    <Script
      async
      src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${pId}`}
      crossOrigin='anonymous'
      strategy='afterInteractive'
    />
  )
}

export default AdSense
