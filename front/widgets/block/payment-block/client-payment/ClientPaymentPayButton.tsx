import { useBlock } from '@front/entities/quotation/provider/block/useBlock'
import { reduxHolder } from '@front/shared/lib/redux/reduxHolder'
import { Box } from '@mui/material'
import type { FC } from 'react'

export const ClientPaymentPayButton: FC = () => {
  const block = useBlock()

  const paidAt = reduxHolder.useSelector((state) => state.quotation.paidAt)

  const stripePaymentLinkUrl = reduxHolder.useSelector((state) => {
    const thisBlock = state.quotation.blocks[block.index]

    if (thisBlock?.type === 'payment') {
      return thisBlock.payment.stripePaymentLinkUrl
    }

    return null
  })

  const payButtonLabelHtml = reduxHolder.useSelector((state) => {
    const thisBlock = state.quotation.blocks[block.index]

    if (thisBlock?.type === 'payment') {
      return thisBlock.payment.payButtonLabel.html
    }

    return ''
  })

  if (paidAt !== null || stripePaymentLinkUrl === null) {
    return null
  }

  return (
    <Box
      component='a'
      href={stripePaymentLinkUrl}
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
        __html: payButtonLabelHtml || '<p>Pay Now</p>',
      }}
    />
  )
}
