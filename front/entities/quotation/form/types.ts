import type { SelectQuotation } from '@back/entities/quotation'
import type { Signal } from '@preact/signals-react'

export type InfoFormValues = {
  nameSignal: Signal<string>
  categorySignal: Signal<string>
  descSignal: Signal<string>
  infoSignal: Signal<string>
}

export type SaveQuotationFormValues = {
  nameSignal: Signal<string>
  categorySignal: Signal<string>
  descSignal: Signal<string>
  infoSignal: Signal<string>
}

export type AccessFormValuesSignal = Signal<SelectQuotation['access']>
