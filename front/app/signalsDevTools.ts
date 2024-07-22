/* eslint-disable no-console */
import { effect } from '@preact/signals-react'
import { isFroalaSignal } from '@entities/quotation'
import { accessTokenSignal } from '@shared/auth/accessTokenSignal'
import { displayedRowsCountSignal } from '@shared/lib/ag_grid/components/DisplayedRowsCount'
import { reRenderQuotationSignal } from '@shared/signals/reRenderQuotationSignal'

declare const window: Window &
  typeof globalThis & {
    signalsOn: () => void
  }

function signalsOn(): void {
  effect(() => {
    console.log(
      '🚦 displayedRowsCountSignal.value',
      displayedRowsCountSignal.value,
    )
  })

  effect(() => {
    console.log('🚦 isFroalaSignal.value', isFroalaSignal.value)
  })

  effect(() => {
    console.log(
      '🚦 reRenderQuotationSignal.value',
      reRenderQuotationSignal.value,
    )
  })

  effect(() => {
    console.log('🚦 accessTokenSignal.value', accessTokenSignal.value)
  })
}

// signalsOn()

window.signalsOn = signalsOn
