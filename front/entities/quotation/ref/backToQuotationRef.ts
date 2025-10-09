import type { RefObject } from 'react'
import type { Quotation } from '../type'

export const backToQuotationRef: RefObject<Quotation | null> = {
  current: null,
}
