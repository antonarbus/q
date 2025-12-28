import type { SaveQuotationFormValues } from '@entities/quotation/form/types'
import { useSignal } from '@preact/signals-react'

type Res = SaveQuotationFormValues

export const useQuotationSaveFormValues = (): Res => {
  const saveQuotationFormValues: SaveQuotationFormValues = {
    nameSignal: useSignal(''),
    categorySignal: useSignal(''),
    descSignal: useSignal(''),
    infoSignal: useSignal(''),
  }

  return saveQuotationFormValues
}
