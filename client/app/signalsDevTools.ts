/* eslint-disable no-console */
import { effect } from '@preact/signals-react'
import { displayedRowsCountSignal } from '@pages/quotations/DisplayedRowsCount'
import { isItemsFroalaSignal } from '@entities/items'
import { quotationSignal } from '@entities/quotation'
import { reRenderQuotationSignal } from '@shared/signals/reRenderQuotationSignal'

declare const window: Window & typeof globalThis & {
  signalsOn: () => void
}

function signalsOn(): void {
  effect(() => { console.log('🚦 totalRowsSignal.value', displayedRowsCountSignal.value) })
  effect(() => { console.log('🚦 isItemsFroalaSignal.value', isItemsFroalaSignal.value) })
  effect(() => { console.log('🚦 reRenderQuotationSignal.value', reRenderQuotationSignal.value) })
  effect(() => { console.log('🚦 quotationSignal.value', quotationSignal.value) })
}

// signalsOn()

window.signalsOn = signalsOn
