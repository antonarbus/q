import { useStripeAccountStatusQuery } from '@front/entities/payment/api/useStripeAccountStatusQuery'
import { ConnectStripeButton } from '@front/features/user/connect-stripe/ConnectStripeButton'
import { DisconnectStripeButton } from '@front/features/user/disconnect-stripe/DisconnectStripeButton'
import { OpenStripeButton } from '@front/features/user/open-stripe/OpenStripeButton'
import { RotatingLoaderIcon } from '@front/shared/component/RotatingLoaderIcon'
import { Box } from '@mui/material'

export const StripeConnection = (): React.JSX.Element => {
  const stripeStatusQuery = useStripeAccountStatusQuery()

  if (stripeStatusQuery.isPending === true) {
    return <RotatingLoaderIcon style={{ height: '16px', width: '16px' }} />
  }

  if (
    stripeStatusQuery.data?.connected === undefined ||
    stripeStatusQuery.data.connected === false
  ) {
    return <ConnectStripeButton />
  }

  if (stripeStatusQuery.data.stripeAccountId === null) {
    return <RotatingLoaderIcon style={{ height: '16px', width: '16px' }} />
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px' }}>
      <span>Stripe connected ({stripeStatusQuery.data.stripeAccountId})</span>
      <Box sx={{ display: 'flex', gap: '8px' }}>
        <OpenStripeButton stripeAccountId={stripeStatusQuery.data.stripeAccountId} />
        <DisconnectStripeButton stripeAccountId={stripeStatusQuery.data.stripeAccountId} />
      </Box>
    </Box>
  )
}
