import { StripeConnection } from '@front/widgets/stripe-connection/StripeConnection'
import { FileStorage } from '@front/widgets/file-storage/FileStorage'
import { SubscriptionStatus } from '@front/widgets/subscription-status/SubscriptionStatus'
import { Avatar, Box, Divider } from '@mui/material'
import { BackdropWithSlidableModal } from '@front/shared/component/BackdropWithSlidableModal'
import { CardCustom } from '@front/shared/component/CardCustom'
import { reduxHolder } from '@front/shared/lib/redux/reduxHolder'
import { theme } from '@front/shared/theme'
import { IoSettingsOutline } from 'react-icons/io5'
import { useNavigate } from 'react-router-dom'
import { useRef } from 'react'

export const SettingsModal = (): React.JSX.Element => {
  const cardRef = useRef<HTMLDivElement>(null)
  const navigate = useNavigate()

  return (
    <BackdropWithSlidableModal
      onUnmount={(): void => {
        navigate('..')
      }}
      shouldUnmountOnClickAway={true}
      shouldUnmountOnEsc={true}
    >
      <CardCustom
        reference={cardRef}
        title={reduxHolder.getState().user.email}
        logo={
          <Avatar sx={{ margin: 1, bgcolor: theme.color.darkBackground }}>
            <IoSettingsOutline />
          </Avatar>
        }
        sx={{
          paddingLeft: '20px',
          paddingRight: '20px',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
            gap: '20px',
          }}
        >
          <Divider sx={{ width: '100%' }} />
          <StripeConnection />
          <Divider sx={{ width: '100%' }} />
          <SubscriptionStatus />
          <Divider sx={{ width: '100%' }} />
          <FileStorage />
        </Box>
      </CardCustom>
    </BackdropWithSlidableModal>
  )
}
