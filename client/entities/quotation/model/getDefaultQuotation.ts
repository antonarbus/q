import { customAlphabet } from 'nanoid'
import { type Quotation } from '../types'

const nanoid = customAlphabet('123456789abcdefghijkmnpqrstuvwxyzABCDEFGHJKMNPQRSTUVWXYZ')

export const getDefaultQuotation = (): Quotation => {
  return {
    id: nanoid(5),
  }
}
