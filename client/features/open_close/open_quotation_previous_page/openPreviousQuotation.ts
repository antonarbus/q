import { router } from '@lib_instances/Router'
import { previousQuotationRef } from '@entities/quotation'

export const openPreviousQuotation = (): void => {
  void router.navigate(`/${previousQuotationRef.current?.id ?? 'new'}`)
}
