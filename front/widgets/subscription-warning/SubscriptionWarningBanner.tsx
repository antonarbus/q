import { useSubscriptionStatusQuery } from '@front/entities/user/api/useSubscriptionStatusQuery'
import { SubscribeButtons } from '@front/features/user/subscribe/SubscribeButtons'
import { SUBSCRIPTION_WARNING_THRESHOLD } from '@back/shared/const/subscription'
import { Alert } from '@mui/material'

export const SubscriptionWarningBanner = (): React.JSX.Element | null => {
  const subscriptionStatusQuery = useSubscriptionStatusQuery()

  if (subscriptionStatusQuery.data === undefined) {
    return null
  }

  const { quotationCount, freeLimit, subscriptionExpiresAt } = subscriptionStatusQuery.data
  const hasAccess = subscriptionExpiresAt !== null && new Date(subscriptionExpiresAt) > new Date()

  if (hasAccess || quotationCount < SUBSCRIPTION_WARNING_THRESHOLD) {
    return null
  }

  return (
    <Alert severity='warning' sx={{ borderRadius: 0 }} action={<SubscribeButtons size='small' />}>
      {quotationCount} / {freeLimit} quotations used. Get unlimited access before you hit the limit.
    </Alert>
  )
}
