import { instance } from '@shared/instance'
import { backToQuotationRef } from '@entities/quotation'
import type { QuotationLocationState } from '.'

export const openQuotationPageAndLoadPrev = (): void => {
  const state: QuotationLocationState = {
    quotationType: 'previous',
  }

  void instance.router.navigate(`/${backToQuotationRef.current?.id ?? 'new'}`, {
    state,
  })
}
