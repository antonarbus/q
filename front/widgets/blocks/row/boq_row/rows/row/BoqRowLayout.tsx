import { Box } from '@mui/material'
import type { FocusEvent, ReactNode } from 'react'
import { cls } from '@shared/consts/cls'

type Props = {
  children: ReactNode
  onBlur: (e: FocusEvent<HTMLDivElement>) => void
}

export const BoqRowLayout = ({ children, onBlur }: Props): JSX.Element => {
  return (
    <Box
      className={cls.boqRow}
      onBlur={(e) => {
        onBlur(e)
      }}
      style={{
        display: 'flex',
        justifyContent: 'flex-end',
        position: 'relative',
        borderBottom: '1px solid #e8e8e8',
      }}
    >
      {children}
    </Box>
  )
}
