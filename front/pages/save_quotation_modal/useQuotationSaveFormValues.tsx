import type { SaveQuotationFormValues } from '@entities/quotation'
import { useSignal } from '@preact/signals-react'

type Res = {
  saveQuotationFormValues: SaveQuotationFormValues
}

export const useQuotationSaveFormValues = (): Res => {
  const saveQuotationFormValues: SaveQuotationFormValues = {
    nameSignal: useSignal(''),
    categorySignal: useSignal(''),
    descSignal: useSignal(''),
    infoSignal: useSignal(''),
  }

  return { saveQuotationFormValues }
}
