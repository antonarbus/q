import { GeneratePaymentLinkButton } from '@front/features/blocks/generate-payment-link'
import { useBlock } from '@front/entities/quotation/provider/block/useBlock'
import { CiCreditCard1 } from 'react-icons/ci'
import { useState } from 'react'
import type { FC } from 'react'
import { OwnerPaymentLayout } from './OwnerPaymentLayout'
import { PaymentHeading } from './PaymentHeading'
import { PaymentStatusBadge } from './PaymentStatusBadge'
import { PaymentAmount } from './PaymentAmount'
import { PaymentCurrency } from './PaymentCurrency'
import { PaymentButtonLabel } from './PaymentButtonLabel'
import { PaymentLink } from './PaymentLink'

export const OwnerPayment: FC = () => {
  const block = useBlock()
  const [amountInput, setAmountInput] = useState(
    block.item.type === 'payment' && block.item.payment.amount > 0
      ? String(block.item.payment.amount / 100)
      : '',
  )

  const [amountError, setAmountError] = useState(false)

  return (
    <OwnerPaymentLayout
      paymentLogo={<CiCreditCard1 style={{ fontSize: '24px' }} />}
      paymentHeading={<PaymentHeading />}
      paymentStatusBadge={<PaymentStatusBadge />}
      paymentAmount={
        <PaymentAmount
          amountInput={amountInput}
          amountError={amountError}
          onChange={(value) => {
            setAmountInput(value)
            setAmountError(false)
          }}
        />
      }
      paymentCurrency={<PaymentCurrency />}
      paymentButtonLabel={<PaymentButtonLabel />}
      paymentLink={<PaymentLink />}
      paymentLinkGenerateButton={
        <GeneratePaymentLinkButton
          amountInput={amountInput}
          onInvalidAmount={() => setAmountError(true)}
        />
      }
      devMode={false}
    />
  )
}
