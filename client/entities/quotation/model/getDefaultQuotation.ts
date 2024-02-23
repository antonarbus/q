import { type Quotation } from '../types'

export const getDefaultQuotation = (): Quotation => {
  return {
    id: 'local version',
    isSaved: false,
  }
}
