import { type MutableRefObject } from 'react'
import { type Quotation } from '../types'

export const previousQuotationRef: MutableRefObject<Quotation | null> = {
  current: null,
}
