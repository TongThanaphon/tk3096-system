import {
  TooltipProvider,
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from '@/components/ui/tooltip'

interface ActionTooltipProps {
  children: React.ReactNode
  label: string
  side?: 'top' | 'right' | 'bottom' | 'left'
  align?: 'start' | 'end' | 'center'
}

export const ActionTooltip = (props: ActionTooltipProps) => {
  const { children, label, side, align } = props

  return (
    <TooltipProvider>
      <Tooltip delayDuration={50}>
        <TooltipTrigger asChild>{children}</TooltipTrigger>
        <TooltipContent side={side} align={align}>
          <p className='capitalize font-semibold text-sm'>{label}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
