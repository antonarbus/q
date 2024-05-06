import { signal } from '@preact/signals-react'
import throttle from 'lodash.throttle'

export const cursorPosSignal = signal({ x: 0, y: 0 })

const throttledMouseMove = throttle((e: MouseEvent): void => {
  cursorPosSignal.value = { x: e.x, y: e.y }
}, 25)

// eslint-disable-next-line @typescript-eslint/no-unsafe-argument
document.addEventListener('mousemove', throttledMouseMove, false)
