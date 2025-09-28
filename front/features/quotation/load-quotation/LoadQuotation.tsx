import { useLoadQuotation } from './useLoadQuotation'
import { useResetQuotationOnNavigationButtonClick } from './useResetQuotationOnNavigationButtonClick'
import type { ReactNode } from 'react'

export const LoadQuotation = (): ReactNode => {
  useLoadQuotation()
  useResetQuotationOnNavigationButtonClick()

  return null
}
