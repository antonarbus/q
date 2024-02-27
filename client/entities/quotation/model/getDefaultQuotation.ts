import { type Quotation } from '../types'

export const getDefaultQuotation = (): Quotation => {
  return {
    isLocal: true,
    isSaved: false,
  }
}
