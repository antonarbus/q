import { Box } from '@mui/material'
import type { ReactNode } from 'react'
import { className } from '../className'

type Props = {
  children: ReactNode
  id: string
}

export const BoqRowLayout = ({ children, id }: Props): JSX.Element => {
  return (
    <Box
      id={id}
      className={className.boqRow}
      sx={{
        display: 'flex',
        minHeight: '50px',
        alignItems: 'flex-end',
        position: 'relative',
      }}
    >
      {children}
    </Box>
  )
}
