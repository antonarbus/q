import { router } from '@lib_instances/router'
import { backToQuotationRef } from '@entities/quotation'
import type { QuotationLocationState } from '.'

export const openQuotationPageAndLoadPrev = (): void => {
  const state: QuotationLocationState = {
    quotationType: 'previous',
  }

  void router.navigate(`/${backToQuotationRef.current?.id ?? 'new'}`, {
    state,
  })
}
