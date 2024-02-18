import { localStorageKey } from '@shared/consts/localStorageKey'
import { jsonParseSafe } from '@shared/lib/jsonParseSafe'
import { getDefaultQuotation } from '../model/getDefaultQuotation'
import { type Quotation } from '../types'

export const getDefaultOrLocalQuotation = (): Quotation => {
  console.log(666)
  const defaultQuotation = getDefaultQuotation()
  const quotationFromLocalStorage = localStorage.getItem(localStorageKey.quotation)

  if (quotationFromLocalStorage === null) {
    localStorage.setItem(localStorageKey.quotation, JSON.stringify(defaultQuotation))
    return defaultQuotation
  }

  const quotation = jsonParseSafe<Quotation>(quotationFromLocalStorage)
  if (quotation === undefined) {
    localStorage.setItem(localStorageKey.quotation, JSON.stringify(defaultQuotation))
    return defaultQuotation
  }

  return quotation
}
