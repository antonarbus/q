import { type Signal, signal } from '@preact/signals-react'
import { type Quotation } from '../types'
import { getDefaultOrLocalQuotation } from '../utils/getDefaultOrLocalQuotation'

export const quotationSignal: Signal<Quotation> = signal(getDefaultOrLocalQuotation())
