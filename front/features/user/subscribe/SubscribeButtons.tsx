import { useSubscriptionCheckoutMutation } from '@front/entities/user/api/useSubscriptionCheckoutMutation'
import { Box, Button } from '@mui/material'
import type { ButtonProps } from '@mui/material'

type Props = {
  mode?: 'buy' | 'extend'
  size?: ButtonProps['size']
}

export const SubscribeButtons = ({ mode = 'buy', size }: Props): React.JSX.Element => {
  const checkoutMutation = useSubscriptionCheckoutMutation()

  const handleCheckout = async (period: 'monthly' | 'annual'): Promise<void> => {
    const result = await checkoutMutation.mutateAsync({ period })

    if (result.checkoutUrl) {
      window.location.href = result.checkoutUrl
    }
  }

  const isExtend = mode === 'extend'

  return (
    <Box sx={{ display: 'flex', gap: isExtend ? 1 : 2, justifyContent: 'center' }}>
      <Button
        disabled={checkoutMutation.isPending}
        size={size}
        variant='outlined'
        onClick={() => {
          handleCheckout('monthly')
        }}
      >
        {isExtend ? 'Extend 1 month — $12' : '1 month — $12'}
      </Button>
      <Button
        disabled={checkoutMutation.isPending}
        size={size}
        variant={isExtend ? 'outlined' : 'contained'}
        onClick={() => {
          handleCheckout('annual')
        }}
      >
        {isExtend ? 'Extend 1 year — $60' : '1 year — $60'}
      </Button>
    </Box>
  )
}
