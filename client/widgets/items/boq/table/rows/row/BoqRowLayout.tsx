import { Box } from '@mui/material'
import type { ReactNode } from 'react'
import { PasteHere } from './paste_here_row'
import { className } from 'client/shared/className'

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
        // https://stackoverflow.com/questions/8468066/child-inside-parent-with-min-height-100-not-inheriting-height
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        minHeight: '60px',
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
