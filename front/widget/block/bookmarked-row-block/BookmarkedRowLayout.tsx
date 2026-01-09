import { Box } from '@mui/material'
import { cls } from '@shared/cls'
import type { FocusEvent, JSX, ReactNode } from 'react'

type Props = {
  children: ReactNode
  onBlur: (e: FocusEvent<HTMLDivElement>) => void
}

export const BookmarkedRowLayout = (props: Props): JSX.Element => {
  return (
    <Box
      className={cls.row}
      onBlur={(event) => {
        props.onBlur(event)
      }}
      style={{
        display: 'flex',
        justifyContent: 'flex-end',
        position: 'relative',
        borderBottom: '1px solid #e8e8e8',
      }}
    >
      {props.children}
    </Box>
  )
}
