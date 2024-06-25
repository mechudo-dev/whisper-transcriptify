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

export function ExportFormatSelect({
  exportFormat,
  setExportFormat,
}: {
  exportFormat: string
  setExportFormat: Dispatch<SetStateAction<string>>
}) {
  return (
    <Select>
      <SelectTrigger className='w-full'>
        <SelectValue placeholder='Export Formats' />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Export Formats</SelectLabel>
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
