import { useLoadQuotation } from './useLoadQuotation'
import { useResetQuotationOnNavigationButtonClick } from './useResetQuotationOnNavigationButtonClick'
import { useHandlePaymentSuccess } from './useHandlePaymentSuccess'

export const LoadQuotation = (): React.ReactNode => {
  useLoadQuotation()
  useResetQuotationOnNavigationButtonClick()
  useHandlePaymentSuccess()

  return null
}
