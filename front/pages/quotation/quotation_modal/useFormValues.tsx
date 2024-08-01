import type { QuotationFormValues } from '@entities/quotation/types'
import { useSignal } from '@preact/signals-react'

type Res = {
  quotationFormValues: QuotationFormValues
}

export const useQuotationFormValues = (): Res => {
  const quotationFormValues: QuotationFormValues = {
    nameSignal: useSignal(''),
    categorySignal: useSignal(''),
    descSignal: useSignal(''),
    infoSignal: useSignal(''),
    shareWithOptionSignal: useSignal('nobody'),
    sharedWithSignal: useSignal([]),
  }

  return { quotationFormValues }
}
