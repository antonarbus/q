import { effect } from '@preact/signals-react'
import { isFroalaSignal, reLoadQuotationSignal } from '@entities/quotation'
import { accessTokenSignal } from '@shared/auth/accessTokenSignal'
import { displayedRowsCountSignal } from '@shared/lib/ag_grid/components/DisplayedRowsCount'

declare const window: Window &
  typeof globalThis & {
    signalsOn: () => void
  }

function signalsOn(): void {
  effect(() => {
    console.info(
      '🚦 displayedRowsCountSignal.value',
      displayedRowsCountSignal.value,
    )
  })

  effect(() => {
    console.info('🚦 isFroalaSignal.value', isFroalaSignal.value)
  })

  effect(() => {
    console.info('🚦 reLoadQuotationSignal.value', reLoadQuotationSignal.value)
  })

  effect(() => {
    console.info('🚦 accessTokenSignal.value', accessTokenSignal.value)
  })
}

// signalsOn()

window.signalsOn = signalsOn
