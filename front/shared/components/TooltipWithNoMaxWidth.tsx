import { Tooltip, type TooltipProps, tooltipClasses } from '@mui/material'
import { styled } from '@mui/material/styles'

export const TooltipWithNoMaxWidth = styled(
  ({ className, ...props }: TooltipProps) => (
    <Tooltip
      {...props}
      classes={{ popper: className }}
    />
  ),
)({
  [`& .${tooltipClasses.tooltip}`]: {
    maxWidth: 'none',
  },
})
