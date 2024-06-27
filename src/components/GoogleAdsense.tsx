'use client'

import React from 'react'
import { Adsense } from '@ctrl/react-adsense'

function AdsenseExample() {
  return (
    <Adsense
      className='ExampleAdSlot w-28 h-60 block'
      client='ca-pub-8574483971880465'
      slot='9212563774'
      adTest='on' //Dev Only
      data-full-width-responsive="true"
    />
  )
}

export default AdsenseExample
