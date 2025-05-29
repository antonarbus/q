/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/no-unnecessary-condition */
/* eslint-disable no-console */
import { asyncDelay } from '@shared/utils/delay'
import { useRef } from 'react'

const MIN_SPINNER_TIME = 400
const SPINNER_DELAY = 200

const sayHelloAfterDelay = async (): Promise<'Hello'> => {
  await asyncDelay(300)

  return 'Hello'
}

const checkWetherToShowSpinnerOrNot = async (): Promise<'show spinner'> => {
  await asyncDelay(SPINNER_DELAY)

  return 'show spinner'
}

const onClick = async (): Promise<void> => {
  const res = await Promise.race([
    checkWetherToShowSpinnerOrNot(),
    sayHelloAfterDelay(),
  ])

  if (res !== 'show spinner') {
    console.log('✅ Fast response, no spinner')
    console.log(res)

    return
  }

  if (res === 'show spinner') {
    console.log('⏳ Show spinner')

    const spinnerStart = Date.now()
    const finalRes = await sayHelloAfterDelay()
    const spinnerTime = Date.now() - spinnerStart
    const remaining = MIN_SPINNER_TIME - spinnerTime

    if (remaining > 0) {
      console.log('⏳ Extend spinner a bit')
      await asyncDelay(remaining) // ensure spinner is visible for min time
    }

    console.log('✅ Done:', finalRes)
  }
}

export const TestPage = (): React.JSX.Element => {
  const ref = useRef<React.ComponentRef<'div'>>(null)

  return (
    <div ref={ref}>
      <button
        onClick={onClick}
        type='button'
      >
        Click me
      </button>
    </div>
  )
}
