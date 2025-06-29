import { useLoadQuotation } from './useLoadQuotation'
import { useResetQuotationOnNavigationButtonClick } from './useResetQuotationOnNavigationButtonClick'

export const LoadQuotation = (): React.ReactNode => {
  useLoadQuotation()
  useResetQuotationOnNavigationButtonClick()

  return null
}
