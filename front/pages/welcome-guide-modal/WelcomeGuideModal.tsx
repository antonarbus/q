import { CloseWelcomeGuideButton } from '@front/features/welcome-guide/close-welcome-guide/CloseWelcomeGuideButton'
import { GoToNextWelcomeGuideSlide } from '@front/features/welcome-guide/go-to-next-welcome-guide-slide/GoToNextWelcomeGuideSlide'
import { GoToPrevWelcomeGuideSlide } from '@front/features/welcome-guide/go-to-prev-welcome-guide-slide/GoToPrevWelcomeGuideSlide'
import { BackdropWithSlidableModal } from '@front/shared/component/BackdropWithSlidableModal'
import { CardCustom } from '@front/shared/component/CardCustom'
import { WelcomeGuideProvider } from '@front/shared/welcome-guide/WelcomeGuideProvider'
import { WelcomeGuideDots, WelcomeGuideSlide } from '@front/widgets/welcome-guide'
import { Box } from '@mui/material'
import { useNavigate } from 'react-router-dom'

export const WelcomeGuideModal = (): React.JSX.Element => {
  const navigate = useNavigate()

  return (
    <WelcomeGuideProvider>
      <BackdropWithSlidableModal
        onUnmount={(): void => {
          void navigate('..')
        }}
        shouldUnmountOnClickAway={true}
        shouldUnmountOnEsc={true}
      >
        <CardCustom
          sx={{
            width: '80vw',
            maxWidth: '80vw',
            height: '80vh',
            maxHeight: '80vh',
            padding: '36px',
            position: 'relative',
          }}
        >
          <CloseWelcomeGuideButton />
          <WelcomeGuideSlide />
          <WelcomeGuideDots />
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginTop: '16px',
            }}
          >
            <GoToPrevWelcomeGuideSlide />
            <GoToNextWelcomeGuideSlide />
          </Box>
        </CardCustom>
      </BackdropWithSlidableModal>
    </WelcomeGuideProvider>
  )
}
