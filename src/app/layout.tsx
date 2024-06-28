import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '@/components/theme-provider'
import Navbar from '@/components/Navbar'
import { Toaster } from '@/components/ui/toaster'
import AdSense from '@/components/AdSense'
import AdBanner from '@/components/AdBanner'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Transcriptify',
  description: 'Easily obtain the transcription of your audio files.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <>
      <html lang='en' suppressHydrationWarning>
        <head>
          <AdSense pId='ca-pub-8574483971880465' />
        </head>
        <body className={inter.className}>
          <ThemeProvider
            attribute='class'
            defaultTheme='system'
            enableSystem
            disableTransitionOnChange
          >
            <main className='relative flex flex-col min-h-screen '>
              <Navbar />
              <div className='flex flex-row gap-4 justify-center items-center'>
                {children}
              </div>
            </main>
            <Toaster />
          </ThemeProvider>
        </body>
      </html>
    </>
  )
}
