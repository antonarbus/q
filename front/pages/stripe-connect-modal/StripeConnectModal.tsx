import { ConnectStripeContent } from '@front/widgets/stripe-connect-content/ConnectStripeContent'
import { BackdropWithSlidableModal } from '@front/shared/component/BackdropWithSlidableModal'
import { CardCustom } from '@front/shared/component/CardCustom'
import { Avatar, Box } from '@mui/material'
import { SiStripe } from 'react-icons/si'
import { useNavigate } from 'react-router-dom'

export const StripeConnectModal = (): React.JSX.Element => {
  const navigate = useNavigate()

  return (
    <BackdropWithSlidableModal
      shouldUnmountOnClickAway={true}
      shouldUnmountOnEsc={true}
      onUnmount={(): void => {
        void navigate('..')
      }}
    >
      <CardCustom
        title='Connect Stripe'
        logo={
          <Avatar sx={{ margin: 1, bgcolor: '#635bff' }}>
            <SiStripe />
          </Avatar>
        }
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '16px',
            padding: '8px 0',
            minWidth: '280px',
          }}
        >
          <ConnectStripeContent />
        </Box>
      </CardCustom>
    </BackdropWithSlidableModal>
  )
}
