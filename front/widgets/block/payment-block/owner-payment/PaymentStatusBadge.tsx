import { useBlock } from '@front/entities/quotation/provider/block/useBlock'
import { reduxHolder } from '@front/shared/lib/redux/reduxHolder'
import { Box } from '@mui/material'
import type { FC } from 'react'

export const PaymentStatusBadge: FC = () => {
  const block = useBlock()

  const hasPaymentLink = reduxHolder.useSelector((state) => {
    const thisBlock = state.quotation.blocks[block.index]
    return thisBlock?.type === 'payment' ? thisBlock.payment.stripePaymentLinkUrl !== null : false
  })

  const isPaid = reduxHolder.useSelector((state) => state.quotation.paidAt !== null)

  if (!hasPaymentLink) {
    return null
  }

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: '5px',
        fontSize: '11px',
        color: isPaid ? 'success.main' : 'warning.main',
        fontWeight: 500,
        flexShrink: 0,
      }}
    >
      <Box
        sx={{
          width: 7,
          height: 7,
          borderRadius: '50%',
          bgcolor: isPaid ? 'success.main' : 'warning.main',
        }}
      />
      {isPaid ? 'Paid' : 'Payment link generated'}
    </Box>
  )
}
