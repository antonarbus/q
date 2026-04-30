import { Box, Chip, Typography } from '@mui/material'
import { CiCreditCard1 } from 'react-icons/ci'
import { reduxHolder } from '@front/shared/lib/redux/reduxHolder'
import type { FC } from 'react'
import type { PaymentBlock } from '@back/entity/quotation/schema'

type Props = {
  payment: PaymentBlock['payment']
}

export const ClientPayment: FC<Props> = (props) => {
  const paidAt = reduxHolder.useSelector((state) => state.quotation.paidAt)
  const isPaid = paidAt !== null

  const formattedAmount =
    props.payment.amount > 0
      ? new Intl.NumberFormat('en-US', {
          style: 'currency',
          currency: props.payment.currency.toUpperCase(),
        }).format(props.payment.amount / 100)
      : null

  return (
    <Box
      sx={{
        padding: '20px',
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
        backgroundColor: isPaid ? 'rgba(76, 175, 80, 0.05)' : 'white',
        borderRadius: '8px',
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
        <CiCreditCard1 style={{ fontSize: '22px', flexShrink: 0 }} />
        <Box
          sx={{
            fontWeight: 600,
            fontSize: '1rem',
            flex: 1,
            '& p': { margin: 0 },
            '& strong': { fontWeight: 700 },
          }}
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: props.payment.heading?.html || '<p>Payment</p>' }}
        />
        {isPaid && <Chip color='success' label='Paid' size='small' />}
      </Box>

      {formattedAmount !== null && (
        <Typography fontWeight={700} textAlign='center' variant='h6'>
          {formattedAmount}
        </Typography>
      )}

      {isPaid === false && props.payment.stripePaymentLinkUrl !== null && (
        <Box
          component='a'
          href={props.payment.stripePaymentLinkUrl}
          rel='noopener noreferrer'
          target='_blank'
          sx={{
            display: 'block',
            textAlign: 'center',
            padding: '10px 16px',
            backgroundColor: '#343434e6',
            color: 'white',
            borderRadius: '6px',
            textDecoration: 'none',
            cursor: 'pointer',
            '& p': { margin: 0, textAlign: 'center' },
            '& strong': { fontWeight: 700 },
          }}
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{
            __html: props.payment.payButtonLabel?.html || '<p>Pay Now</p>',
          }}
        />
      )}
    </Box>
  )
}
