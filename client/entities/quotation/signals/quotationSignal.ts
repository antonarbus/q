import { type Signal, signal } from '@preact/signals-react'
import { type QuotationModelType } from '@server/db/models/quotationModel'

export const quotationSignal: Signal<QuotationModelType> = signal({
  id: 'local version',
  email: 'some email',
})
