import type { ShareQuotationFormValues } from '@entities/quotation'
import { useSignal } from '@preact/signals-react'

type Res = {
  shareQuotationFormValues: ShareQuotationFormValues
}

export const useShareQuotationFormValues = (): Res => {
  const shareQuotationFormValues: ShareQuotationFormValues = {
    shareWithOptionSignal: useSignal('nobody'),
    sharedWithSignal: useSignal([]),
  }

  return { shareQuotationFormValues }
}
