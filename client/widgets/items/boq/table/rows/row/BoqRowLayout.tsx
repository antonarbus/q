import { Box } from '@mui/material'
import type { ReactNode } from 'react'
import { PasteHere } from './paste_here_row'
import { className } from 'client/shared/className'
import { useRow } from 'client/entities/items'

type Props = {
  children: ReactNode
}

export const BoqRowLayout = ({ children }: Props): JSX.Element => {
  const { rowId } = useRow()

  return (
    <Box
      id={rowId}
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
      <PasteHere>
        {children}
      </PasteHere>
    </Box>
  )
}
