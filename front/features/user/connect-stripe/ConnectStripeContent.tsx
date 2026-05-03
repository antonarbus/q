import { useStripeAccountStatusQuery } from '@front/entities/stripe/api/useStripeAccountStatusQuery'
import { useStripeConnectUrlQuery } from '@front/entities/stripe/api/useStripeConnectUrlQuery'
import { RotatingLoaderIcon } from '@front/shared/component/RotatingLoaderIcon'
import { buildSearchParams } from '@front/shared/lib/react-router-dom/searchParams'
import { route } from '@front/shared/lib/react-router-dom/route'
import { routerHolder } from '@front/shared/lib/react-router-dom/routerHolder'
import { reduxHolder } from '@front/shared/lib/redux/reduxHolder'
import { Box, Button, Typography } from '@mui/material'
import { useEffect } from 'react'
import { SiStripe } from 'react-icons/si'
import { useSearchParams } from 'react-router-dom'

type Props = {
  onDone: () => void
}

export const ConnectStripeContent = (props: Props): React.JSX.Element => {
  const [searchParams, setSearchParams] = useSearchParams()
  const stripeStatusQuery = useStripeAccountStatusQuery()
  const stripeConnectUrlQuery = useStripeConnectUrlQuery()

  const stripeError = searchParams.get('stripe_error')

  const email = reduxHolder.useSelector((state) => state.user.email)

  useEffect(() => {
    if (searchParams.get('stripe_connected') === 'true' || stripeError !== null) {
      stripeStatusQuery.refetch()
      setSearchParams({}, { replace: true })
    }
  }, [searchParams, setSearchParams, stripeStatusQuery, stripeError])

  if (email === null) {
    return (
      <Button
        variant='contained'
        onClick={() => {
          routerHolder.router.navigate(
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
    return (
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
        <Typography color='success.main' variant='body2'>
          Stripe account connected
        </Typography>
        <Typography
          component='a'
          href={`https://dashboard.stripe.com/${stripeStatusQuery.data.stripeAccountId}`}
          target='_blank'
          rel='noopener noreferrer'
          color='text.secondary'
          sx={{ fontSize: '12px' }}
        >
          {stripeStatusQuery.data.stripeAccountId}
        </Typography>
        <Button onClick={props.onDone} variant='contained'>
          Done
        </Button>
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
        disabled={stripeConnectUrlQuery.isFetching}
        startIcon={<SiStripe />}
        variant='contained'
        onClick={async (): Promise<void> => {
          const result = await stripeConnectUrlQuery.refetch()

          if (result.data?.url !== undefined) {
            window.location.href = result.data.url
          }
        }}
      >
        {stripeConnectUrlQuery.isFetching === true ? 'Loading...' : 'Connect'}
      </Button>
    </Box>
  )
}
