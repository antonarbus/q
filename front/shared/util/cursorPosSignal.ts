import { signal } from '@preact/signals-react'
import throttle from 'lodash.throttle'

export const cursorPosSignal = signal({ x: 0, y: 0 })

const throttledMouseMove = throttle((event: MouseEvent): void => {
  cursorPosSignal.value = { x: event.x, y: event.y }
}, 25)

document.addEventListener('mousemove', throttledMouseMove, false)
