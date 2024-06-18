import { router } from '@lib_instances/Router'
import { previousQuotationRef } from '@entities/quotation'
import { type QuotationLocationState } from '.'

export const openQuotationPageAndLoadPrev = (): void => {
  const state: QuotationLocationState = {
    quotationType: 'previous',
  }

  void router.navigate(`/${previousQuotationRef.current?.id ?? 'new'}`, {
    state,
  })
}
