import { Box } from '@mui/material'
import { cls } from '@shared/cls'
import type { JSX } from 'react'

export const DropHereText = (): JSX.Element => {
  return (
    <Box
      className={cls.dropHereText}
      style={{
        position: 'absolute',
        top: '2px',
        right: '5px',
        color: 'grey',
        fontSize: '12px',
        fontWeight: 700,
        userSelect: 'none',
        display: 'none',
      }}
    >
      Drop here
    </Box>
  )
}
