import { useLoadQuotation } from './useLoadQuotation'
import { useResetQuotationOnNavigationButtonClick } from './useResetQuotationOnNavigationButtonClick'
import { useHandlePaymentSuccess } from './useHandlePaymentSuccess'
import { useDraftAutoSave } from '@front/features/quotation/draft-auto-save/useDraftAutoSave'

export const LoadQuotation = (): React.ReactNode => {
  useLoadQuotation()
  useResetQuotationOnNavigationButtonClick()
  useHandlePaymentSuccess()
  useDraftAutoSave()

  return null
}
