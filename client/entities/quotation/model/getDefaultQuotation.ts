import { nanoid } from 'nanoid'
import { type Quotation } from '../types'

// const nanoid = customAlphabet('1234567890abcdefghijklmnopqrstuvwxyz')

export const getDefaultQuotation = (): Quotation => {
  return {
    id: nanoid(5),
    isSaved: false,
  }
}
