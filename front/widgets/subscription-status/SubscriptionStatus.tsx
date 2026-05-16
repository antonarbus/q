import { useSubscriptionStatusQuery } from '@front/entities/user/api/useSubscriptionStatusQuery'
import { SubscribeButtons } from '@front/features/user/subscribe/SubscribeButtons'
import { Box, Typography } from '@mui/material'
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

  return (
    <Box sx={{ textAlign: 'center', width: '100%' }}>
      {hasAccess && (
        <>
          <Typography variant='body2'>
            Quota: Unlimited (until {new Date(subscriptionExpiresAt).toLocaleDateString()})
          </Typography>
          <Box sx={{ mt: 1 }}>
            <SubscribeButtons mode='extend' size='small' />
          </Box>
        </>
      )}
      {isLapsed && (
        <>
          <Typography variant='body2'>
            Quota: {freeLimit} (unlimited access expired on{' '}
            {new Date(subscriptionExpiresAt).toLocaleDateString()})
          </Typography>
          <Box sx={{ mt: 1 }}>
            <SubscribeButtons size='small' />
          </Box>
        </>
      )}
      {!hasAccess && !isLapsed && isAtLimit && (
        <>
          <Typography variant='body2'>
            Quota: {quotationCount} / {freeLimit} — get unlimited access
          </Typography>
          <Box sx={{ mt: 1 }}>
            <SubscribeButtons size='small' />
          </Box>
        </>
      )}
      {!hasAccess && !isLapsed && !isAtLimit && (
        <Typography variant='body2'>
          Quota: {quotationCount} / {freeLimit}
        </Typography>
      )}
    </Box>
  )
}
