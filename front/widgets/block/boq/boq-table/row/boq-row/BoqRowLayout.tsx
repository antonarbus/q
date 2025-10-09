import { useRow } from '@entities/quotation'
import { Box } from '@mui/material'
import { cls } from '@shared/const/cls'
import type { FocusEvent, JSX, ReactNode } from 'react'
import { PasteBoqRowTextOverlay } from './paste-here-row'

type Props = {
  children: ReactNode
  onBlur: (e: FocusEvent<HTMLDivElement>) => void
}

export const BoqRowLayout = ({ children, onBlur }: Props): JSX.Element => {
  const { row } = useRow()

  return (
    <Box
      className={cls.boqRow}
      id={row.id}
      onBlur={(event) => {
        onBlur(event)
      }}
      style={{
        // https://stackoverflow.com/questions/8468066/child-inside-parent-with-min-height-100-not-inheriting-height
        // background: 'red',
        borderBottom: '1px solid #e8e8e8',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        position: 'relative',
      }}
    >
      <PasteBoqRowTextOverlay>{children}</PasteBoqRowTextOverlay>
    </Box>
  )
}
