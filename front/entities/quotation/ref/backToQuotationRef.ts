import type { RefObject } from 'react'
import type { Quotation } from '@root/shared/types/Quotation'

export const backToQuotationRef: RefObject<Quotation | null> = {
  current: null,
}
