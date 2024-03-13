/* eslint-disable no-console */
import { effect } from '@preact/signals-react'
import { totalRowsSignal } from '@pages/quotations/TotalRowsCount'
import { isItemsFroalaSignal, reRenderItemsSignal } from '@entities/items'
import { quotationSignal } from '@entities/quotation'
import { isSavedSignal } from '@shared/isSaved'

declare const window: Window & typeof globalThis & {
  signalsOn: () => void
}

function signalsOn(): void {
  effect(() => { console.trace('totalRowsSignal', totalRowsSignal.value) })
  effect(() => { console.trace('isItemsFroalaSignal', isItemsFroalaSignal.value) })
  effect(() => { console.trace('reRenderItemsSignal', reRenderItemsSignal.value) })
  effect(() => { console.trace('quotationSignal', quotationSignal.value) })
  effect(() => { console.trace('isSavedSignal', isSavedSignal.value) })
}

// signalsOn()

window.signalsOn = signalsOn
