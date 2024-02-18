// import { nanoid } from 'nanoid'
import { customAlphabet } from 'nanoid'
import { type Quotation } from '../types'

const nanoid = customAlphabet('1234567890abcdefghijkmnopqrstuvwxyz')

export const getDefaultQuotation = (): Quotation => {
  return {
    id: nanoid(5),
    isSaved: false,
  }
}
