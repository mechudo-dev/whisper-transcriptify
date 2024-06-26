import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { OUTPUT_LANGUAGES } from '@/lib/const'
import { Dispatch, SetStateAction } from 'react'

export function OutputLanguageSelect({
  language,
  setLanguage,
}: {
  language: string
  setLanguage: Dispatch<SetStateAction<string>>
}) {
  return (
    <Select
      onValueChange={(value) => {
        setLanguage(value)
      }}
      value={language}
    >
      <SelectTrigger className='w-full'>
        <SelectValue placeholder='Languages' />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Languages</SelectLabel>
          {OUTPUT_LANGUAGES.map((language) => (
            <SelectItem key={language} value={language}>
              {language}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}
