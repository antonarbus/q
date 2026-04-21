import { useStripeAccountStatusQuery } from '@front/entities/stripe/api/useStripeAccountStatusQuery'
import { useStripeConnectUrlQuery } from '@front/entities/stripe/api/useStripeConnectUrlQuery'
import { RotatingLoaderIcon } from '@front/shared/component/RotatingLoaderIcon'
import { Box, Button } from '@mui/material'
import { SiStripe } from 'react-icons/si'

export const ConnectStripeButton = (): React.JSX.Element => {
  const stripeStatusQuery = useStripeAccountStatusQuery()
  const stripeConnectUrlQuery = useStripeConnectUrlQuery()

  if (stripeStatusQuery.isPending === true) {
    return <RotatingLoaderIcon style={{ height: '16px', width: '16px' }} />
  }

  if (stripeStatusQuery.data?.connected === true) {
    return (
      <Box
        component='a'
        href={`https://dashboard.stripe.com/${stripeStatusQuery.data.stripeAccountId}`}
        target='_blank'
        rel='noopener noreferrer'
        sx={{ fontSize: '13px', color: 'text.secondary' }}
      >
        Stripe connected ({stripeStatusQuery.data.stripeAccountId})
      </Box>
    )
  }

  return (
    <Button
      disabled={stripeConnectUrlQuery.isFetching}
      onClick={async (): Promise<void> => {
        const result = await stripeConnectUrlQuery.refetch()

        if (result.data?.url !== undefined) {
          window.location.href = result.data.url
        }
      }}
      startIcon={<SiStripe />}
      sx={{ minWidth: '155px' }}
      variant='contained'
    >
      {stripeConnectUrlQuery.isFetching === true ? 'Loading...' : 'Connect Stripe'}
    </Button>
  )
}
