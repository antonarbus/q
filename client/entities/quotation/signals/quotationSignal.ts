import { type Signal, signal } from '@preact/signals-react'
import { type Quotation } from '../types'

export const quotationSignal: Signal<Quotation> = signal({ id: 'local version' })
