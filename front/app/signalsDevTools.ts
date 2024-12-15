import { effect } from '@preact/signals-react'
import { isFroalaSignal, reLoadQuotationSignal } from '@entities/quotation'
import { accessTokenSignal } from '@entities/user'

declare const window: Window &
  typeof globalThis & {
    signalsOn: () => void
  }

function signalsOn(): void {
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
