import { nanoid } from 'nanoid'
import { type Quotation } from '../types'

export const defaultQuotation: Quotation = {
  id: nanoid(5),
  isSaved: false,
}
