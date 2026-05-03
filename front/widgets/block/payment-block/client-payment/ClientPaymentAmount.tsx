import { useBlock } from '@front/entities/quotation/provider/block/useBlock'
import { reduxHolder } from '@front/shared/lib/redux/reduxHolder'
import { Typography } from '@mui/material'
import type { FC } from 'react'

export const ClientPaymentAmount: FC = () => {
  const block = useBlock()

  const formattedAmount = reduxHolder.useSelector((state) => {
    const thisBlock = state.quotation.blocks[block.index]

    if (thisBlock?.type !== 'payment') {
      return null
    }

    if (thisBlock.payment.amount <= 0) {
      return null
    }

    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: thisBlock.payment.currency.toUpperCase(),
    }).format(thisBlock.payment.amount / 100)
  })

  if (formattedAmount === null) {
    return null
  }

  return (
    <Typography sx={{ fontWeight: 700, textAlign: 'center' }} variant='h6'>
      {formattedAmount}
    </Typography>
  )
}
