import { Box } from '@mui/material'
import { cls } from '@shared/const/cls'
import type { JSX,ReactNode,FocusEvent } from 'react'

type Props = {
  children: ReactNode
  onBlur: (e: FocusEvent<HTMLDivElement>) => void
}

export const BoqRowLayout = ({
  children,
  onBlur,
}: Props): JSX.Element => {
  return (
    <Box
      className={cls.boqRow}
      onBlur={(event) => {
        onBlur(event)
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
