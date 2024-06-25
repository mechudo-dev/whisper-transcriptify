'use client'

import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useEffect, useState } from 'react'
import Editor from './Editor'
import { FileInput } from './FileInput'
import { useToast } from '@/components/ui/use-toast'
import { Separator } from './ui/separator'
import { CircleHelp } from 'lucide-react'
import { CustomTooltip } from './CustomTooltip'
import { ACCEPTED_FILE_TYPES } from '@/lib/const'
import { OutputLanguageSelect } from './OutputLanguageSelect'
import { ExportFormatSelect } from './ExportFormatSelect'

export function TranscriptCard() {
  const { toast } = useToast()
  const [APIKey, setApiKey] = useState<string>('')
  const [transcription, setTranscription] = useState<string>('')
  const [file, setFile] = useState<File | null>(null)
  const [isEditorVisible, setIsEditorVisible] = useState<Boolean>(false)
  const [language, setLanguage] = useState<string>('')
  const [exportFormat, setExportFormat] = useState<string>('')

  const getApiKey = (): string => {
    const apiKey = localStorage.getItem('APIKey')
    return apiKey !== null ? apiKey : ''
  }

  const handleSaveAPIKey = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    localStorage.setItem('APIKey', APIKey)
    toast({
      title: 'OpenIA API Key saved.',
      description: 'The next time it will be restored automatically.',
    })
  }

  const handleAPIKeyInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setApiKey(event.target.value)
  }

  const handleCleanButton = (event: React.MouseEvent<HTMLButtonElement>) => {
    setApiKey('')
    setTranscription('')
  }

  const handleCopyTranscriptionButton = () => {
    navigator.clipboard.writeText(transcription)
  }

  const handleGenerateTranscriptionButton = () => {
    if (APIKey === '') {
      toast({
        variant: 'destructive',
        title: 'No OpenAI API Key entered.',
        description: 'Remember to enter a OpenAI Key.',
      })
      return
    }
    if (!file) {
      toast({
        variant: 'destructive',
        title: 'No file selected.',
        description: 'Remember to upload a file in the second step.',
      })
      return
    }
    if (!isValidFileType) {
      toast({
        variant: 'destructive',
        title: 'Type file is not allowed.',
        description:
          'Select a file of type .mp3, .mp4, .mpeg, .mpga, .m4a, .wav, .ogg or .webm.',
      })
      return
    }
    if (language === '') {
      toast({
        variant: 'destructive',
        title: 'Type file is not allowed.',
        description:
          'Select a file of type .mp3, .mp4, .mpeg, .mpga, .m4a, .wav, .ogg or .webm.',
      })
      return
    }
    fetchTranscription()
  }

  const isValidFileType = (fileName: string) => {
    const allowedExtensions = ACCEPTED_FILE_TYPES.split(',')
    const fileExtension = fileName.split('.').pop()
    return (
      fileExtension && allowedExtensions.includes(fileExtension.toLowerCase())
    )
  }

  const fetchTranscription = async () => {
    if (!file) return

    const formData = new FormData()
    formData.append('file', file)
    formData.append('model', 'whisper-1')
    const response = await fetch(
      'https://api.openai.com/v1/audio/transcriptions',
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${APIKey}`,
        },
        body: formData,
      }
    )
    if (response.ok) {
      const res = await response.json()
      setTranscription(res)
      setIsEditorVisible(true)
      // TODO: fix fetch
      console.log(res)
    } else {
      toast({
        variant: 'destructive',
        title: 'Failed to transcribe the file.',
      })
    }
  }

  // useEffect(() => {
  //   console.log(transcription)
  // }, [transcription])

  useEffect(() => {
    setApiKey(getApiKey)
  }, [])

  return (
    <Card className='max-w-[900px]'>
      <CardHeader>
        <CardTitle>Speech to Text</CardTitle>
        <CardDescription>
          Follow the following steps to transcribe your files (types supported:
          .mp3, .mp4, .mpeg, .mpga, .m4a, .wav, .ogg and .webm) to text and be
          able to edit it.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div>
          <div className='grid w-full items-center gap-4'>
            <div className='flex flex-col space-y-1.5'>
              <div className='flex flex-row gap-1'>
                <Label htmlFor='apikey'>1. Enter your OpenAI API Key</Label>
                <CustomTooltip text='Go to the OpenIA Platform page, enter your account or create a new one and in the API Keys window generate a new key and copy it here.'>
                  <CircleHelp size={16} className='cursor-pointer' />
                </CustomTooltip>
              </div>
              <div className='flex gap-2'>
                <Input
                  onChange={handleAPIKeyInputChange}
                  id='apikey'
                  placeholder='OpenAI API'
                  value={APIKey}
                />
                <Button
                  onClick={(e) => {
                    handleSaveAPIKey(e)
                  }}
                >
                  Save OpenIA API Key
                </Button>
              </div>
            </div>
            <div className='flex flex-col space-y-1.5'>
              <div className='flex flex-row gap-1'>
                <Label htmlFor='framework'>2. Upload file</Label>
                <CustomTooltip
                  text='Types supported:
          .mp3, .mp4, .mpeg, .mpga, .m4a, .wav, .ogg and .webm'
                >
                  <CircleHelp size={16} className='cursor-pointer' />
                </CustomTooltip>
              </div>
              <FileInput file={file} setFile={setFile} />
            </div>
            <div className='grid gap-2 justify-around grid-cols-2'>
              <div className='flex flex-col space-y-1.5'>
                <Label htmlFor='framework'>3. Select output language</Label>
                <OutputLanguageSelect
                  language={language}
                  setLanguage={setLanguage}
                />
              </div>
              <div className='flex flex-col space-y-1.5'>
                <Label htmlFor='framework'>4. Select export format</Label>
                <ExportFormatSelect
                  exportFormat={exportFormat}
                  setExportFormat={setExportFormat}
                />
              </div>
            </div>
            <div className='flex flex-col space-y-1.5'>
              <Label htmlFor='framework'>5. Generate Transcription</Label>
              <Button
                onClick={(e) => {
                  handleGenerateTranscriptionButton(e)
                }}
              >
                Generate Transcription
              </Button>
            </div>
            {/* TODO: fix fetch */}
            {isEditorVisible && (
              <>
                <Separator className='' />
                <CardTitle>Transcription</CardTitle>
                <Editor
                  transcription={transcription}
                  setTranscription={setTranscription}
                />
                <div className='flex justify-end'>
                  <Button
                    onClick={(e) => {
                      handleCopyTranscriptionButton(e)
                    }}
                  >
                    Copy Transcription
                  </Button>
                </div>
              </>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
