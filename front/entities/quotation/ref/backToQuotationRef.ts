import type { Quotation } from '@back/entity/quotation/schema'

export const backToQuotationRef: React.RefObject<Quotation | null> = {
  current: null,
}
