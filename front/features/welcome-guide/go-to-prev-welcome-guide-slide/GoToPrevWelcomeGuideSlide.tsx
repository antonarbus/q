import { useWelcomeGuide } from '@front/shared/welcome-guide/WelcomeGuideProvider'
import { Button } from '@mui/material'

export const GoToPrevWelcomeGuideSlide = (): React.JSX.Element => {
  const welcomeGuide = useWelcomeGuide()

  return (
    <Button
      disabled={welcomeGuide.currentSlide === 0}
      onClick={welcomeGuide.goPrev}
      size='small'
      variant='text'
    >
      Back
    </Button>
  )
}
