import type { ReactNode } from 'react'
import { useLoadQuotation } from './useLoadQuotation'
import { useResetQuotationOnNavigationButtonClick } from './useResetQuotationOnNavigationButtonClick'

export const LoadQuotation = (): ReactNode => {
  useLoadQuotation()
  useResetQuotationOnNavigationButtonClick()

  return null
}
