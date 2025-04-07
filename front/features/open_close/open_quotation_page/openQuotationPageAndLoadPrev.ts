import { router } from '@shared/lib/router'
import { backToQuotationRef } from '@entities/quotation'

export const openQuotationPageAndLoadPrev = (): void => {
  void router.navigate(`/${backToQuotationRef.current?.id ?? 'new'}`)
}
