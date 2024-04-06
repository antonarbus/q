import { signal } from '@preact/signals-react'

export const cursorPosSignal = signal({ x: 0, y: 0 })

document.addEventListener('mousemove', (e) => {
  cursorPosSignal.value = { x: e.x, y: e.y }
}, false)
