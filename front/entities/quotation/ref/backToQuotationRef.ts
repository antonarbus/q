import type { RefObject } from 'react'
import type { Quotation } from '@back/entities/quotation/schemas'

export const backToQuotationRef: RefObject<Quotation | null> = {
  current: null,
}
