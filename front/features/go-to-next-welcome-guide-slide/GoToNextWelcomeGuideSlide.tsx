import { useWelcomeGuide } from '@front/shared/welcomeGuide/welcomeGuideContext'
import { Button } from '@mui/material'

export const GoToNextWelcomeGuideSlide = (): React.JSX.Element => {
  const welcomeGuide = useWelcomeGuide()

  const isLastSlide = welcomeGuide.currentSlide === welcomeGuide.totalSlides - 1

  return (
    <Button onClick={welcomeGuide.goNext} size='small' variant='contained'>
      {isLastSlide ? 'Done' : 'Next'}
    </Button>
  )
}
