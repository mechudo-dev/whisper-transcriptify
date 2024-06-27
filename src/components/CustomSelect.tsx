import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Dispatch, SetStateAction } from 'react'

export function CustomSelect({
  value,
  setValue,
  placeHolder,
  options,
}: {
  value: string
  setValue: Dispatch<SetStateAction<string>>
  placeHolder: string
  options: string[]
}) {
  return (
    <Select
      onValueChange={(value) => {
        setValue(value)
      }}
      value={value}
    >
      <SelectTrigger className='w-full'>
        <SelectValue placeholder={placeHolder} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>{placeHolder}</SelectLabel>
          {options.map((optionItem) => (
            <SelectItem key={optionItem} value={optionItem}>
              {optionItem}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}
