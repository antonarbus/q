import type { RefObject } from 'react'
import type { Quotation } from '../types/Quotation'

export const backToQuotationRef: RefObject<Quotation | null> = {
  current: null,
}
