import { useStripeConnectUrlMutation } from '@front/entities/payment/api/useStripeConnectUrlQuery'
import { Button } from '@mui/material'
import { SiStripe } from 'react-icons/si'

export const ConnectStripeButton = (): React.JSX.Element => {
  const stripeConnectUrlMutation = useStripeConnectUrlMutation()

  return (
    <Button
      disabled={stripeConnectUrlMutation.isPending}
      onClick={() =>
        void (async (): Promise<void> => {
          const result = await stripeConnectUrlMutation.mutateAsync({ returnUrl: null })
          window.location.href = result.url
        })()
      }
      startIcon={<SiStripe />}
      sx={{ minWidth: '155px' }}
      variant='contained'
    >
      {stripeConnectUrlMutation.isPending === true ? 'Loading...' : 'Connect Stripe'}
    </Button>
  )
}
