import { jsonParseSafe } from '@shared/lib/jsonParseSafe'
import { defaultQuotation } from '../model/defaultQuotation'
import { type Quotation } from '../types'

export const getDefaultOrLocalQuotation = (): Quotation => {
  const quotationFromLocalStorage = localStorage.getItem('quotation')
  if (quotationFromLocalStorage === null) return defaultQuotation
  const quotation = jsonParseSafe<Quotation>(quotationFromLocalStorage)
  if (quotation === undefined) return defaultQuotation
  return quotation
}
