import { LinearProgress } from '@mui/material'

type Props = {
  isShown: boolean
}

export const ProgressGridBar = (props: Props): React.ReactNode => {
  if (props.isShown === false) {
    return null
  }

  return <LinearProgress sx={{ height: '1px', top: '97px', zIndex: 2, mb: '-1px' }} />
}
