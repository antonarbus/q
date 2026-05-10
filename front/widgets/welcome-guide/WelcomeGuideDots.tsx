import { useWelcomeGuide } from '@front/shared/welcome-guide/WelcomeGuideProvider'
import { Box } from '@mui/material'

export const WelcomeGuideDots = (): React.JSX.Element => {
  const welcomeGuide = useWelcomeGuide()

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        gap: '8px',
        marginTop: '20px',
        marginBottom: '4px',
      }}
    >
      {Array.from({ length: welcomeGuide.totalSlides }, (_, index) => (
        <Box
          key={index}
          onClick={() => {
            welcomeGuide.goToSlide(index)
          }}
          sx={{
            width: 7,
            height: 7,
            borderRadius: '50%',
            backgroundColor: index === welcomeGuide.currentSlide ? '#1976d2' : '#ddd',
            cursor: 'pointer',
            transition: 'background-color 0.2s',
            flexShrink: 0,
          }}
        />
      ))}
    </Box>
  )
}
