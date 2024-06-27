'use client'

import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
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
import {
  ACCEPTED_FILE_TYPES,
  EXPORT_FORMATS,
  OUTPUT_LANGUAGES,
} from '@/lib/const'
import { CustomSelect } from './CustomSelect'

export function TranscriptCard() {
  const { toast } = useToast()
  const [APIKey, setApiKey] = useState<string>('')
  const [file, setFile] = useState<File | null>(null)
  const [language, setLanguage] = useState<string>('English')
  const [exportFormat, setExportFormat] = useState<string>('text')
  const [transcription, setTranscription] = useState<string>('')
  const [isEditorVisible, setIsEditorVisible] = useState<Boolean>(false)

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

    if (!isValidFileType(file.name)) {
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
        title: 'Select an output language.',
      })
      return
    }
    if (exportFormat === '') {
      toast({
        variant: 'destructive',
        title: 'Select an export format.',
      })
      return
    }
    fetchTranscription()
  }

  const isValidFileType = (fileName: string) => {
    const allowedExtensions = ACCEPTED_FILE_TYPES.split(', ')
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
    formData.append('language', language)
    formData.append('response_format', exportFormat)
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

    // const response = {
    //   ok: true,
    //   json: {
    //       text: 'holi mundo',
    //     }
    //   },
    // }
    if (response.ok) {
      const res = await response.json()
      console.log(res.text)
      console.log(response)

      setTranscription(res)
      setIsEditorVisible(true)
    } else {
      toast({
        variant: 'destructive',
        title: 'Failed to transcribe the file.',
      })
    }
  }

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
        <div className='grid w-full items-center gap-4'>
          <div className='flex flex-col space-y-1.5'>
            <div className='flex flex-row gap-1'>
              <Label htmlFor='apikey'>1. Enter your OpenAI API Key</Label>
              <CustomTooltip text='Go to the OpenIA Platform page, enter your account or create a new one and in the API Keys window generate a new key and copy it here.'>
                <CircleHelp size={16} className='cursor-pointer' />
              </CustomTooltip>
            </div>
            <div className='flex sm:flex-row flex-col gap-2'>
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
          .mp3, .mp4, .mpeg, .mpga, .m4a, .wav, .ogg and .webm. Max file size: 25MB.'
              >
                <CircleHelp size={16} className='cursor-pointer' />
              </CustomTooltip>
            </div>
            <FileInput file={file} setFile={setFile} />
          </div>
          <div className='sm:grid gap-2 justify-around sm:grid-cols-2 flex flex-col'>
            <div className='flex flex-col space-y-1.5'>
              <Label htmlFor='framework'>3. Select output language</Label>
              <CustomSelect
                value={language}
                setValue={setLanguage}
                options={OUTPUT_LANGUAGES}
                placeHolder='Languages'
              />
            </div>
            <div className='flex flex-col space-y-1.5'>
              <Label htmlFor='framework'>4. Select export format</Label>
              <CustomSelect
                value={exportFormat}
                setValue={setExportFormat}
                options={EXPORT_FORMATS}
                placeHolder='Export Formats'
              />
            </div>
          </div>
          <div className='flex flex-col space-y-1.5'>
            <Label htmlFor='framework'>5. Generate Transcription</Label>
            <Button
              onClick={() => {
                handleGenerateTranscriptionButton()
              }}
            >
              Generate Transcription
            </Button>
          </div>
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
                  onClick={() => {
                    handleCopyTranscriptionButton()
                  }}
                >
                  Copy Transcription
                </Button>
              </div>
            </>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
