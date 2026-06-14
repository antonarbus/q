import { useSubscriptionCheckoutMutation } from '@front/entities/user/api/useSubscriptionCheckoutMutation'
import { Button } from '@mui/material'
import type { ButtonProps } from '@mui/material'
import type { FC } from 'react'

type Props = {
  mode: 'buy' | 'extend'
  size: ButtonProps['size']
}

export const SubscribeButton: FC<Props> = (props) => {
  const checkoutMutation = useSubscriptionCheckoutMutation()

  return (
    <Button
      disabled={checkoutMutation.isPending}
      size={props.size}
      variant={props.mode === 'extend' ? 'outlined' : 'contained'}
      onClick={() =>
        void (async (): Promise<void> => {
          const result = await checkoutMutation.mutateAsync()
          window.location.href = result.checkoutUrl
        })()
      }
    >
      {props.mode === 'extend' ? 'Extend 1 year — $99' : 'Subscribe — $99 / year'}
    </Button>
  )
}
