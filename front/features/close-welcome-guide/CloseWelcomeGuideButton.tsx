import { useWelcomeGuide } from '@front/shared/welcome-guide/WelcomeGuideProvider'
import { IconButton } from '@mui/material'
import { MdClose } from 'react-icons/md'

export const CloseWelcomeGuideButton = (): React.JSX.Element => {
  const welcomeGuide = useWelcomeGuide()

  return (
    <IconButton
      onClick={welcomeGuide.close}
      size='small'
      sx={{
        position: 'absolute',
        top: 12,
        right: 12,
        color: 'text.secondary',
      }}
    >
      <MdClose />
    </IconButton>
  )
}
