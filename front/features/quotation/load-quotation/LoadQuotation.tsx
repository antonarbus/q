import { useLoadQuotation } from './useLoadQuotation'
import { useResetQuotationOnNavigationButtonClick } from './useResetQuotationOnNavigationButtonClick'
import { useHandlePaymentSuccess } from './useHandlePaymentSuccess'
import { useHandleSubscriptionSuccess } from './useHandleSubscriptionSuccess'
import { useHandleStripeConnectSuccess } from './useHandleStripeConnectSuccess'
import { useDraftAutoSave } from '@front/features/quotation/draft-auto-save/useDraftAutoSave'

export const LoadQuotation = (): React.ReactNode => {
  useLoadQuotation()
  useResetQuotationOnNavigationButtonClick()
  useHandlePaymentSuccess()
  useHandleSubscriptionSuccess()
  useHandleStripeConnectSuccess()
  useDraftAutoSave()

  return null
}
