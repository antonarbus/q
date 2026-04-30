import { reduxHolder } from '@front/shared/lib/redux/reduxHolder'
import { quotationSlice } from '@front/entities/quotation/redux/quotationSlice'
import { useBlock } from '@front/entities/quotation/provider/block/useBlock'
import { stripeCurrencies } from '@front/shared/lib/stripe/stripeCurrencies'
import { Box } from '@mui/material'
import type { FC } from 'react'

export const PaymentCurrency: FC = () => {
  const block = useBlock()

  const currency = reduxHolder.useSelector((state) => {
    const thisBlock = state.quotation.blocks[block.index]

    if (thisBlock?.type === 'payment') {
      return thisBlock.payment.currency
    }

    return 'usd'
  })

  const hasPaymentLink = reduxHolder.useSelector((state) => {
    const thisBlock = state.quotation.blocks[block.index]

    if (thisBlock?.type === 'payment') {
      return thisBlock.payment.stripePaymentLinkUrl !== null
    }

    return false
  })

  return (
    <Box
      component='select'
      disabled={hasPaymentLink}
      value={currency.toUpperCase()}
      onChange={(event: React.ChangeEvent<HTMLSelectElement>) => {
        reduxHolder.dispatch(
          quotationSlice.actions.setPaymentCurrency({
            blockIndex: block.index,
            value: event.target.value,
          }),
        )
      }}
      sx={{
        width: '100%',
        border: '1px solid',
        borderColor: 'divider',
        borderRadius: '6px',
        padding: '7px 10px',
        fontSize: '13px',
        fontFamily: 'inherit',
        color: 'text.primary',
        background: 'transparent',
        outline: 'none',
        boxSizing: 'border-box',
        cursor: hasPaymentLink ? 'default' : 'pointer',
        appearance: 'none',
        paddingRight: '28px',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'right 10px center',
        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='18' height='18' viewBox='0 0 24 24'%3E%3Cpath fill='%23666' d='M7 10l5 5 5-5z'/%3E%3C/svg%3E")`,
        '&:focus': { borderColor: 'text.secondary' },
        '&:disabled': { background: '#f8f8f8', color: 'text.disabled', cursor: 'default' },
        '&::placeholder': { color: 'text.disabled', opacity: 1 },
      }}
    >
      {stripeCurrencies.map((code) => (
        <option key={code} value={code}>
          {code}
        </option>
      ))}
    </Box>
  )
}
