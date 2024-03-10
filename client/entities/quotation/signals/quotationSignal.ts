import { type Signal, signal } from '@preact/signals-react'
// import { customAlphabet } from 'nanoid'
import { type Quotation } from '../types'
// import { getDefaultOrLocalQuotation } from '../utils/getDefaultOrLocalQuotation'

// const nanoid = customAlphabet('123456789abcdefghijkmnpqrstuvwxyzABCDEFGHJKMNPQRSTUVWXYZ')

export const quotationSignal: Signal<Quotation> = signal({
  id: '',
})
