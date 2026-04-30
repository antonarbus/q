import { useBlock } from '@front/entities/quotation/provider/block/useBlock'
import { reduxHolder } from '@front/shared/lib/redux/reduxHolder'
import { Box } from '@mui/material'
import { useRef, useEffect } from 'react'
import type { FC } from 'react'

type Props = {
  amountInput: string
  amountError: boolean
  onChange: (value: string) => void
}

export const PaymentAmount: FC<Props> = (props) => {
  const block = useBlock()
  const inputRef = useRef<HTMLInputElement>(null)

  const hasPaymentLink = reduxHolder.useSelector((state) => {
    const thisBlock = state.quotation.blocks[block.index]

    if (thisBlock?.type === 'payment') {
      return thisBlock.payment.stripePaymentLinkUrl !== null
    }

    return false
  })

  useEffect(() => {
    if (props.amountError) {
      inputRef.current?.focus()
    }
  }, [props.amountError])

  return (
    <Box
      ref={inputRef}
      component='input'
      disabled={hasPaymentLink}
      min={0.5}
      step={0.01}
      placeholder='0.00'
      type='number'
      value={props.amountInput}
      onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
        props.onChange(event.target.value)
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
        ...(props.amountError && {
          borderColor: 'error.main',
          '&:focus': { borderColor: 'error.main' },
        }),
      }}
    />
  )
}
