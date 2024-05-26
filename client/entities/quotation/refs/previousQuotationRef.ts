import { type MutableRefObject } from 'react'
import { type Quotation } from '@entities/quotation'

export const previousQuotationRef: MutableRefObject<Quotation | null> = {
  current: null,
}
