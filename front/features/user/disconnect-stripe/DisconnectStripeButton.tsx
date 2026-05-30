import { useStripeAccountStatusQuery } from '@front/entities/payment/api/useStripeAccountStatusQuery'
import { useStripeDisconnectMutation } from '@front/entities/payment/api/useStripeDisconnectMutation'
import { confirmWithDialog } from '@front/shared/component/confirmation-dialog/confirmWithDialog'
import { Button } from '@mui/material'
import type { SxProps, Theme } from '@mui/material'

type Props = {
  stripeAccountId: string
  size?: 'small' | 'medium' | 'large'
  variant?: 'text' | 'outlined' | 'contained'
  sx?: SxProps<Theme>
}

export const DisconnectStripeButton = (props: Props): React.JSX.Element => {
  const { stripeAccountId, size = 'small', variant = 'outlined', sx } = props
  const stripeStatusQuery = useStripeAccountStatusQuery()
  const stripeDisconnectMutation = useStripeDisconnectMutation()

  return (
    <Button
      color='error'
      disabled={stripeDisconnectMutation.isPending}
      size={size}
      sx={sx}
      variant={variant}
      onClick={async (): Promise<void> => {
        const answer = await confirmWithDialog({
          title: 'Disconnect Stripe',
          description: `Disconnect ${stripeAccountId} from this account?\n\nYou will no longer be able to accept payments until you reconnect.`,
          inputLabel: '2 + 3 = ?',
          confirmButtonText: 'Disconnect',
          rejectButtonText: 'Cancel',
        })

        if (answer !== '5') {
          return
        }

        await stripeDisconnectMutation.mutateAsync()
        await stripeStatusQuery.refetch()
      }}
    >
      {stripeDisconnectMutation.isPending ? 'Disconnecting...' : 'Disconnect'}
    </Button>
  )
}
