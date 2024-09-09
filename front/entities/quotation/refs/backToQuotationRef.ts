import type { MutableRefObject } from 'react'
import type { Quotation } from '../types'

export const backToQuotationRef: MutableRefObject<Quotation | null> = {
  current: null,
}
