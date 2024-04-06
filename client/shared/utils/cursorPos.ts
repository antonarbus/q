import { signal } from '@preact/signals-react'

export const cursorPosSignal = signal({
  x: 0,
  y: 0,
})

document.addEventListener('mousemove', function(e) {
  cursorPosSignal.value = { x: e.pageX, y: e.pageY }
}, false)
