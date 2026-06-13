import { useStripeConnectUrlQuery } from '@front/entities/payment/api/useStripeConnectUrlQuery'
import { Button } from '@mui/material'
import { SiStripe } from 'react-icons/si'

export const ConnectStripeButton = (): React.JSX.Element => {
  const stripeConnectUrlQuery = useStripeConnectUrlQuery()

  return (
    <Button
      disabled={stripeConnectUrlQuery.isFetching}
      onClick={() =>
        void (async (): Promise<void> => {
          const result = await stripeConnectUrlQuery.refetch()

          if (result.data?.url !== undefined) {
            globalThis.location.href = result.data.url
          }
        })()
      }
      startIcon={<SiStripe />}
      sx={{ minWidth: '155px' }}
      variant='contained'
    >
      {stripeConnectUrlQuery.isFetching === true ? 'Loading...' : 'Connect Stripe'}
    </Button>
  )
}
