import { reduxHolder } from '@front/shared/lib/redux/reduxHolder'
import { quotationSlice } from '@front/entities/quotation/redux/quotationSlice'
import { useBlock } from '@front/entities/quotation/provider/block/useBlock'
import { Box } from '@mui/material'
import { useRef, useEffect } from 'react'
import type { FC } from 'react'

export const PaymentAmount: FC = () => {
  const inputRef = useRef<HTMLInputElement>(null)
  const block = useBlock()

  const amountInput = reduxHolder.useSelector((state) => {
    const thisBlock = state.quotation.blocks[block.index]

    if (thisBlock?.type !== 'payment') {
      return ''
    }

    if (thisBlock.payment.amountInput === '' && thisBlock.payment.amount > 0) {
      return String(thisBlock.payment.amount / 100)
    }

    return thisBlock.payment.amountInput
  })

  const amountError = reduxHolder.useSelector((state) => {
    const thisBlock = state.quotation.blocks[block.index]

    if (thisBlock?.type === 'payment') {
      return thisBlock.payment.amountError
    }

    return false
  })

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
      min={0.5}
      step={0.01}
      placeholder='0.00'
      disabled={hasPaymentLink}
      type='number'
      value={amountInput}
      onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
        reduxHolder.dispatch(
          quotationSlice.actions.setPaymentAmountInput({
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
