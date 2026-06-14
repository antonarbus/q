import { useStripeAccountStatusQuery } from '@front/entities/payment/api/useStripeAccountStatusQuery'
import { useStripeConnectUrlMutation } from '@front/entities/payment/api/useStripeConnectUrlQuery'
import { DisconnectStripeButton } from '@front/features/user/disconnect-stripe/DisconnectStripeButton'
import { OpenStripeButton } from '@front/features/user/open-stripe/OpenStripeButton'
import { RotatingLoaderIcon } from '@front/shared/component/RotatingLoaderIcon'
import { buildSearchParams, getSearchParam } from '@front/shared/lib/react-router-dom/searchParams'
import { route } from '@front/shared/lib/react-router-dom/route'
import { routerHolder } from '@front/shared/lib/react-router-dom/routerHolder'
import { reduxHolder } from '@front/shared/lib/redux/reduxHolder'
import { Box, Button, Typography } from '@mui/material'
import { SiStripe } from 'react-icons/si'
import { useNavigate, useSearchParams } from 'react-router-dom'

export const ConnectStripeContent = (): React.JSX.Element => {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()

  const stripeStatusQuery = useStripeAccountStatusQuery()
  const stripeConnectUrlMutation = useStripeConnectUrlMutation()

  const stripeError = searchParams.get('stripe_error')

  const email = reduxHolder.useSelector((state) => state.user.email)

  if (email === null) {
    return (
      <Button
        variant='contained'
        onClick={() => {
          void routerHolder.router.navigate(
            `./${route.login}${buildSearchParams({ redirect: route.stripeConnect, shouldSlide: 'true' })}`,
          )
        }}
      >
        Log in to connect Stripe
      </Button>
    )
  }

  if (stripeStatusQuery.isPending === true) {
    return <RotatingLoaderIcon style={{ height: '20px', width: '20px' }} />
  }

  if (stripeStatusQuery.data?.connected === true) {
    const { stripeAccountId } = stripeStatusQuery.data

    if (stripeAccountId === null) {
      return <RotatingLoaderIcon style={{ height: '20px', width: '20px' }} />
    }

    return (
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
        <SiStripe size={28} color='#635bff' />
        <Typography color='success.main' variant='body2'>
          Stripe account connected
        </Typography>
        <Typography color='text.secondary' sx={{ fontSize: '12px' }}>
          {stripeAccountId}
        </Typography>
        <Box sx={{ display: 'flex', gap: '8px', mt: 1 }}>
          <OpenStripeButton stripeAccountId={stripeAccountId} />
          <Button
            onClick={() => {
              void navigate('..')
            }}
            variant='contained'
            size='small'
          >
            Done
          </Button>
        </Box>
        <DisconnectStripeButton stripeAccountId={stripeAccountId} sx={{ mt: 1 }} variant='text' />
      </Box>
    )
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '45px' }}>
      {stripeError !== null && (
        <Typography color='error' sx={{ textAlign: 'center' }} variant='body2'>
          Stripe connection failed: {stripeError}
        </Typography>
      )}
      <Typography color='text.secondary' sx={{ textAlign: 'center' }} variant='body2'>
        Connect your Stripe account to accept payments from clients
      </Typography>
      <Button
        disabled={stripeConnectUrlMutation.isPending}
        startIcon={<SiStripe />}
        variant='contained'
        onClick={() =>
          void (async (): Promise<void> => {
            const returnUrl = getSearchParam('returnUrl')
            const result = await stripeConnectUrlMutation.mutateAsync({ returnUrl })
            window.location.href = result.url
          })()
        }
      >
        {stripeConnectUrlMutation.isPending === true ? 'Loading...' : 'Connect'}
      </Button>
    </Box>
  )
}
