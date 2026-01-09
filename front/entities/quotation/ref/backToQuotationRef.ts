import type { RefObject } from 'react'
import type { Quotation } from '@back/entity/quotation/schema'

export const backToQuotationRef: RefObject<Quotation | null> = {
  current: null,
}
