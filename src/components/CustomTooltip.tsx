import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { ReactNode } from 'react'

export function CustomTooltip({
  children,
  text,
}: {
  children: ReactNode
  text: string
}) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>{children}</TooltipTrigger>
        <TooltipContent>
          <p className='w-80'>{text}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
