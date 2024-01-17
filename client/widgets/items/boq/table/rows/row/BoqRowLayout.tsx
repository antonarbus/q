import { Box } from '@mui/material'
import type { FocusEvent, ReactNode } from 'react'
import { useRow } from '@entities/items'
import { className } from '@shared/className'
import { PasteHere } from './paste_here_row'

type Props = {
  children: ReactNode
  onBlur: (e: FocusEvent<HTMLDivElement, Element>) => void
}

export const BoqRowLayout = ({ children, onBlur }: Props): JSX.Element => {
  const { rowId } = useRow()

  return (
    <Box
      id={rowId}
      className={className.boqRow}
      onBlur={(e) => {
        onBlur(e)
      }}
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
