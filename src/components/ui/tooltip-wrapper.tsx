import { Tooltip, TooltipContent, TooltipTrigger } from "./tooltip"

interface TooltipWrapperProps {
  tooltip: string
  children: React.ReactNode
}

const TooltipWrapper = ({ tooltip, children }: TooltipWrapperProps) => {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        {children}
      </TooltipTrigger>
      <TooltipContent>
        <p>{tooltip}</p>
      </TooltipContent>
    </Tooltip>
  )
}

export default TooltipWrapper