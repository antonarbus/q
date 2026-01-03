import type { RefObject } from 'react'
import type { Quotation } from '@back/entities/quotation/quotationSchema'

export const backToQuotationRef: RefObject<Quotation | null> = {
  current: null,
}
