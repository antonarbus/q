import { CiCreditCard1 } from 'react-icons/ci'
import { reduxHolder } from '@front/shared/lib/redux/reduxHolder'
import type { FC } from 'react'
import { PaymentStatusBadge } from '../owner-payment/PaymentStatusBadge'
import { ClientPaymentLayout } from './ClientPaymentLayout'
import { ClientPaymentHeading } from './ClientPaymentHeading'
import { ClientPaymentAmount } from './ClientPaymentAmount'
import { ClientPaymentPayButton } from './ClientPaymentPayButton'

export const ClientPayment: FC = () => {
  const isPaid = reduxHolder.useSelector((state) => state.quotation.paidAt !== null)

  return (
    <ClientPaymentLayout
      isPaid={isPaid}
      paymentLogo={<CiCreditCard1 style={{ fontSize: '24px' }} />}
      paymentHeading={<ClientPaymentHeading />}
      paymentStatusBadge={<PaymentStatusBadge />}
      paymentAmount={<ClientPaymentAmount />}
      paymentButton={<ClientPaymentPayButton />}
      devMode={false}
    />
  )
}
