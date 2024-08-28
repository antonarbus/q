import { LinearProgress } from '@mui/material'

type Props = {
  isShown: boolean
}

export const ProgressBar = ({ isShown }: Props): React.ReactNode => {
  if (!isShown) return null

  return (
    <LinearProgress
      sx={{ height: '1px', top: '97px', zIndex: 2, mb: '-1px' }}
    />
  )
}
