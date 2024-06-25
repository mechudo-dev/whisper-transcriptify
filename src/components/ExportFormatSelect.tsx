import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { EXPORT_FORMATS } from '@/lib/const'
import { Dispatch, SetStateAction } from 'react'

export function ExportFormatSelect({
  exportFormat,
  setExportFormat,
}: {
  exportFormat: string
  setExportFormat: Dispatch<SetStateAction<string>>
}) {
  return (
    <Select
      onValueChange={(value) => {
        setExportFormat(value)
      }}
    >
      <SelectTrigger className='w-full'>
        <SelectValue placeholder='Export Formats' />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Export Formats</SelectLabel>
          {EXPORT_FORMATS.map((language) => (
            <SelectItem key={language} value={language}>
              {language}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}
