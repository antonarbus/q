import { Button } from '@mui/material'
import type { FC } from 'react'
import { SiStripe } from 'react-icons/si'

type Props = {
  stripeAccountId: string
  size?: 'small' | 'medium' | 'large'
}

export const OpenStripeButton: FC<Props> = (props) => {
  const { stripeAccountId, size = 'small' } = props

  return (
    <Button
      component='a'
      href={`https://dashboard.stripe.com/${stripeAccountId}`}
      target='_blank'
      rel='noopener noreferrer'
      size={size}
      startIcon={<SiStripe color='#635bff' />}
      variant='outlined'
    >
      Open
    </Button>
  )
}
