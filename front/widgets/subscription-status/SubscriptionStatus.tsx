import { useSubscriptionStatusQuery } from '@front/entities/user/api/useSubscriptionStatusQuery'
import { SubscribeButton } from '@front/features/user/subscribe/SubscribeButton'
import { Box } from '@mui/material'
import type { FC } from 'react'

export const SubscriptionStatus: FC = () => {
  const subscriptionStatusQuery = useSubscriptionStatusQuery()

  if (subscriptionStatusQuery.isSuccess !== true) {
    return null
  }

  const { quotationCount, freeLimit, subscriptionExpiresAt } = subscriptionStatusQuery.data

  const hasAccess = subscriptionExpiresAt !== null && new Date(subscriptionExpiresAt) > new Date()
  const isLapsed = subscriptionExpiresAt !== null && new Date(subscriptionExpiresAt) <= new Date()
  const isAtLimit = quotationCount >= freeLimit

  if (hasAccess) {
    return (
      <Box sx={{ textAlign: 'center', width: '100%' }}>
        <span>Quota: unlimited (until {new Date(subscriptionExpiresAt).toLocaleDateString()})</span>
        <Box sx={{ mt: 1 }}>
          <SubscribeButton mode='extend' size='small' />
        </Box>
      </Box>
    )
  }

  if (isLapsed) {
    return (
      <Box sx={{ textAlign: 'center', width: '100%' }}>
        <span>
          Quota: {freeLimit} (unlimited access expired on{' '}
          {new Date(subscriptionExpiresAt).toLocaleDateString()})
        </span>
        <Box sx={{ mt: 1 }}>
          <SubscribeButton size='small' />
        </Box>
      </Box>
    )
  }

  if (!hasAccess && !isLapsed && isAtLimit) {
    return (
      <Box sx={{ textAlign: 'center', width: '100%' }}>
        <span>
          Quota: {quotationCount} / {freeLimit} — get unlimited access
        </span>
        <Box sx={{ mt: 1 }}>
          <SubscribeButton size='small' />
        </Box>
      </Box>
    )
  }

  return (
    <Box sx={{ textAlign: 'center', width: '100%' }}>
      <span>
        Quota: {quotationCount} / {freeLimit}
      </span>
    </Box>
  )
}
