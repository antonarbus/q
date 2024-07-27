import { Box } from '@mui/material'
import type { FocusEvent, ReactNode } from 'react'
import { useRow } from '@entities/quotation'
import { cls } from '@shared/consts/cls'

type Props = {
  children: ReactNode
  onBlur: (e: FocusEvent<HTMLDivElement>) => void
}

export const BoqRowLayout = ({ children, onBlur }: Props): JSX.Element => {
  const { id } = useRow()

  return (
    <Box
      id={id}
      className={cls.boqRow}
      onBlur={(e) => {
        onBlur(e)
      }}
      style={{
        display: 'flex',
        // flexDirection: 'column',
        justifyContent: 'flex-end',
        position: 'relative',
        borderBottom: '1px solid #e8e8e8',
      }}
    >
      {children}
    </Box>
  )
}
