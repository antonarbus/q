import { Box } from '@mui/material'
import type { ReactNode } from 'react'
import { className } from '../className'
import { PasteHere } from './PasteHere'

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
        minHeight: '50px',
        position: 'relative',
      }}
    >
      <PasteHere id={id}>
        {children}
      </PasteHere>
    </Box>
  )
}
