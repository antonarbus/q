import { type Quotation } from '../types'

export const getDefaultQuotation = (): Quotation => {
  return {
    id: undefined,
    isSaved: false,
  }
}
