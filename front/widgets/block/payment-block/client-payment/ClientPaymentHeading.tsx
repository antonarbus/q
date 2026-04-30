import { useBlock } from '@front/entities/quotation/provider/block/useBlock'
import { reduxHolder } from '@front/shared/lib/redux/reduxHolder'
import { Box } from '@mui/material'
import type { FC } from 'react'

export const ClientPaymentHeading: FC = () => {
  const block = useBlock()

  const headingHtml = reduxHolder.useSelector((state) => {
    const thisBlock = state.quotation.blocks[block.index]

    if (thisBlock?.type === 'payment') {
      return thisBlock.payment.heading.html
    }

    return ''
  })

  return (
    <Box
      sx={{
        fontWeight: 600,
        fontSize: '1rem',
        flex: 1,
        '& p': { margin: 0 },
        '& strong': { fontWeight: 700 },
      }}
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: headingHtml || '<p>Payment</p>' }}
    />
  )
}
