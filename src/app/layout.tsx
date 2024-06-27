import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '@/components/theme-provider'
import { ModeToggle } from '@/components/ModeToggle'
import Navbar from '@/components/Navbar'
import { Toaster } from '@/components/ui/toaster'
import GoogleAdsense from '@/components/GoogleAdsense'

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
        <head />
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
                <GoogleAdsense />
                {children}
                <GoogleAdsense />
              </div>
            </main>
            <Toaster />
          </ThemeProvider>
        </body>
      </html>
    </>
  )
}
