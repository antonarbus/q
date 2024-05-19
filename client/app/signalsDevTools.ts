/* eslint-disable no-console */
import { effect } from '@preact/signals-react'
import { displayedRowsCountSignal } from '@pages/quotation/quotations_page/components/DisplayedRowsCount'
import { isFroalaSignal } from '@entities/quotation'
import { accessTokenSignal } from '@shared/auth/accessTokenSignal'
import { reRenderQuotationSignal } from '@shared/signals/reRenderQuotationSignal'

declare const window: Window & typeof globalThis & {
  signalsOn: () => void
}

function signalsOn(): void {
  effect(() => { console.log('🚦 totalRowsSignal.value', displayedRowsCountSignal.value) })
  effect(() => { console.log('🚦 isItemsFroalaSignal.value', isFroalaSignal.value) })
  effect(() => { console.log('🚦 reRenderQuotationSignal.value', reRenderQuotationSignal.value) })
  effect(() => { console.log('🚦 accessTokenSignal.value', accessTokenSignal.value) })
}

// signalsOn()

window.signalsOn = signalsOn
