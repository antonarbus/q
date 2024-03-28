/* eslint-disable no-console */
import { effect } from '@preact/signals-react'
import { displayedRowsCountSignal } from '@pages/quotations/DisplayedRowsCount'
import { isItemsFroalaSignal, reRenderItemsSignal } from '@entities/items'
import { quotationSignal } from '@entities/quotation'

declare const window: Window & typeof globalThis & {
  signalsOn: () => void
}

function signalsOn(): void {
  effect(() => { console.log('totalRowsSignal', displayedRowsCountSignal.value) })
  effect(() => { console.log('isItemsFroalaSignal', isItemsFroalaSignal.value) })
  effect(() => { console.log('reRenderItemsSignal', reRenderItemsSignal.value) })
  effect(() => { console.log('quotationSignal', quotationSignal.value) })
}

// signalsOn()

window.signalsOn = signalsOn
