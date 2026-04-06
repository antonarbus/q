import { Box, Button, Chip, Typography } from '@mui/material'
import { CiCreditCard1 } from 'react-icons/ci'
import type { PaymentBlock as PaymentBlockType } from '@back/entity/quotation/schema'

type Props = {
  isPaid: boolean
  payment: PaymentBlockType['payment']
}

export const ClientPaymentView = (props: Props): React.JSX.Element => {
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
        border: '1px solid',
        borderColor: props.isPaid ? 'success.light' : 'divider',
        borderRadius: '8px',
        padding: '20px',
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
        maxWidth: '400px',
        backgroundColor: props.isPaid ? 'success.50' : 'background.paper',
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <CiCreditCard1 style={{ fontSize: '22px' }} />
        <Typography fontWeight={600} variant='subtitle1'>
          {props.isPaid ? 'Payment Received' : 'Payment'}
        </Typography>
        {props.isPaid && <Chip color='success' label='Paid' size='small' />}
      </Box>
      {props.payment.description.length > 0 && (
        <Typography color='text.secondary' variant='body2'>
          {props.payment.description}
        </Typography>
      )}
      {formattedAmount !== null && (
        <Typography fontWeight={700} variant='h6'>
          {formattedAmount}
        </Typography>
      )}
      {props.isPaid === false && props.payment.stripePaymentLinkUrl !== null && (
        <Button
          href={props.payment.stripePaymentLinkUrl}
          rel='noopener noreferrer'
          size='medium'
          target='_blank'
          variant='contained'
        >
          Pay Now
        </Button>
      )}
    </Box>
  )
}
