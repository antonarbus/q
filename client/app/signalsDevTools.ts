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
  effect(() => { console.log('totalRowsSignal', totalRowsSignal.value) })
  effect(() => { console.log('isItemsFroalaSignal', isItemsFroalaSignal.value) })
  effect(() => { console.log('reRenderItemsSignal', reRenderItemsSignal.value) })
  effect(() => { console.log('quotationSignal', quotationSignal.value) })
  effect(() => { console.log('isSavedSignal', isSavedSignal.value) })
}

signalsOn()

window.signalsOn = signalsOn
