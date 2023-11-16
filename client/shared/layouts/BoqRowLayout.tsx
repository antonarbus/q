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
        display: 'flex',
        minHeight: '50px',
        position: 'relative',
        borderBottom: '1px solid #e8e8e8',
      }}
    >
      <PasteHere id={id}>
        {children}
      </PasteHere>
    </Box>
  )
}
