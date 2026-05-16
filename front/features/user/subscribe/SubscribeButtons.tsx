import { useSubscriptionCheckoutMutation } from '@front/entities/user/api/useSubscriptionCheckoutMutation'
import { Box, Button } from '@mui/material'

export const SubscribeButtons = (): React.JSX.Element => {
  const checkoutMutation = useSubscriptionCheckoutMutation()

  const handleCheckout = async (period: 'monthly' | 'annual'): Promise<void> => {
    const result = await checkoutMutation.mutateAsync({ period })

    if (result.checkoutUrl) {
      window.location.href = result.checkoutUrl
    }
  }

  return (
    <Box
      sx={{
        display: 'flex',
        gap: 2,
        justifyContent: 'center',
      }}
    >
      <Button
        disabled={checkoutMutation.isPending}
        variant='outlined'
        onClick={() => {
          handleCheckout('monthly')
        }}
      >
        1 month — $12
      </Button>
      <Button
        disabled={checkoutMutation.isPending}
        variant='contained'
        onClick={() => {
          handleCheckout('annual')
        }}
      >
        1 year — $100
      </Button>
    </Box>
  )
}
