import { Box } from '@mui/material'
import type { ReactNode } from 'react'
import { className } from '@shared/consts/className'

type Props = {
  children?: ReactNode
}

export const ItemActionButtonsLayout = ({ children }: Props): JSX.Element => (
  <Box
    className={className.actionsContainer}
    style={{
      display: 'flex',
      flexDirection: 'column',
      gap: '3px',
      alignItems: 'center',
      width: '20px',
      userSelect: 'none',
    }}
    sx={{
      '& > *': {
        height: '12px',
        width: '12px',
        transition: 'scale 0.2s',
        cursor: 'pointer',
        outline: 0,
      },
      '& > *:hover': {
        scale: '1.5',
      },
    }}
  >
    {children}
  </Box>
)
