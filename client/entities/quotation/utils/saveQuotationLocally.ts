import { localStorageKey } from '@shared/consts/localStorageKey'
import { quotationSignal } from '../signals/quotationSignal'

export const saveQuotationLocally = (): void => {
  localStorage.setItem(localStorageKey.quotation, JSON.stringify(quotationSignal.value))
}
