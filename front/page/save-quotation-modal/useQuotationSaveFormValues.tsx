import type { SaveQuotationFormValues } from '@entity/quotation/form/types'
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
