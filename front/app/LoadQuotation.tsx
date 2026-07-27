import { useLoadQuotation } from '@front/features/quotation/load-quotation/useLoadQuotation'
import { useResetQuotationOnNavigationButtonClick } from '@front/features/quotation/load-quotation/useResetQuotationOnNavigationButtonClick'
import { useHandlePaymentSuccess } from '@front/features/quotation/load-quotation/useHandlePaymentSuccess'
import { useHandleSubscriptionSuccess } from '@front/features/quotation/load-quotation/useHandleSubscriptionSuccess'
import { useHandleStripeConnectSuccess } from '@front/features/quotation/load-quotation/useHandleStripeConnectSuccess'
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
