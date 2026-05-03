import { quotationSlice } from '@front/entities/quotation/redux/quotationSlice'
import { useBlock } from '@front/entities/quotation/provider/block/useBlock'
import { reduxHolder } from '@front/shared/lib/redux/reduxHolder'
import { Box } from '@mui/material'
import { useRef, useEffect, useState } from 'react'
import type { FC } from 'react'
import { useOwnerPayment } from './OwnerPaymentProvider'

export const PaymentAmount: FC = () => {
  const block = useBlock()
  const inputRef = useRef<HTMLInputElement>(null)
  const { amountError, setAmountError } = useOwnerPayment()

  const [value, setValue] = useState(
    block.item.type === 'payment' && block.item.payment.amount > 0
      ? String(block.item.payment.amount / 100)
      : '',
  )

  const hasPaymentLink = reduxHolder.useSelector((state) => {
    const thisBlock = state.quotation.blocks[block.index]

    if (thisBlock?.type === 'payment') {
      return thisBlock.payment.stripePaymentLinkUrl !== null
    }

    return false
  })

  useEffect(() => {
    if (amountError) {
      inputRef.current?.focus()
    }
  }, [amountError])

  return (
    <Box
      ref={inputRef}
      component='input'
      disabled={hasPaymentLink}
      min={0.5}
      step={0.01}
      placeholder='0.00'
      type='number'
      value={value}
      onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
        setValue(event.target.value)
        setAmountError(false)
      }}
      onBlur={(event: React.FocusEvent<HTMLInputElement>) => {
        const num = Number.parseFloat(event.target.value)

        reduxHolder.dispatch(
          quotationSlice.actions.setPaymentAmount({
            blockIndex: block.index,
            value: Number.isNaN(num) || num <= 0 ? 0 : Math.round(num * 100),
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
        '&::placeholder': { color: 'text.disabled', opacity: 1 },
        '&:focus': { borderColor: 'text.secondary' },
        '&:disabled': { background: '#f8f8f8', color: 'text.disabled', cursor: 'default' },
        ...(amountError && {
          borderColor: 'error.main',
          '&:focus': { borderColor: 'error.main' },
        }),
      }}
    />
  )
}
