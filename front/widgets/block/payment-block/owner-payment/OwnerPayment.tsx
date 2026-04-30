import { GeneratePaymentLinkButton } from '@front/features/blocks/generate-payment-link'
import { CiCreditCard1 } from 'react-icons/ci'
import { OwnerPaymentLayout } from './OwnerPaymentLayout'
import { PaymentHeading } from './PaymentHeading'
import { PaymentStatusBadge } from './PaymentStatusBadge'
import { PaymentAmount } from './PaymentAmount'
import { PaymentCurrency } from './PaymentCurrency'
import { PaymentButtonLabel } from './PaymentButtonLabel'
import { PaymentLink } from './PaymentLink'
import type { FC } from 'react'

export const OwnerPayment: FC = () => {
  return (
    <OwnerPaymentLayout
      paymentLogo={<CiCreditCard1 style={{ fontSize: '24px' }} />}
      paymentHeading={<PaymentHeading />}
      paymentStatusBadge={<PaymentStatusBadge />}
      paymentAmount={<PaymentAmount />}
      paymentCurrency={<PaymentCurrency />}
      paymentButtonLabel={<PaymentButtonLabel />}
      paymentLink={<PaymentLink />}
      paymentLinkGenerateButton={<GeneratePaymentLinkButton />}
      devMode={false}
    />
  )
}
