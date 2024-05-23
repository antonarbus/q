import { Box } from '@mui/material'
import type { FocusEvent, ReactNode } from 'react'
import { useRow } from '@entities/quotation'
import { cls } from '@shared/consts/cls'
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
      className={cls.boqRow}
      onBlur={(e) => {
        onBlur(e)
      }}
      style={{
        // https://stackoverflow.com/questions/8468066/child-inside-parent-with-min-height-100-not-inheriting-height
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        position: 'relative',
        borderBottom: '1px solid #e8e8e8',
        // background: 'red',
      }}
    >
      <PasteHere>{children}</PasteHere>
    </Box>
  )
}
