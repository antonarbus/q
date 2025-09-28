import { LinearProgress } from '@mui/material'
import type { ReactNode } from 'react'

type Props = {
  isShown: boolean
}

export const ProgressGridBar = ({ isShown }: Props): ReactNode => {
  if (isShown === false) {
    return null
  }

  return (
    <LinearProgress
      sx={{ height: '1px', top: '97px', zIndex: 2, mb: '-1px' }}
    />
  )
}
