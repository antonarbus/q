import type { Quotation } from '../type'
import type { RefObject } from 'react'

export const backToQuotationRef: RefObject<Quotation | null> = {
  current: null,
}
