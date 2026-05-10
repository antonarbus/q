import { useEffectOnce } from 'react-use'

/** Mouse coordinates tracked globally */
export const mousePosition = { x: 0, y: 0 }

/**
 * Used for keyboard shortcuts \
 * When a nav shortcut is triggered by keyboard \
 * some actions (like opening a copy modal) need a MouseEvent with clientX/clientY \
 * but there's no real mouse event on a keypress \
 * So mousePosition holds the last known cursor position, \
 * and a synthetic event is built from it \
 * so the action behaves as if it was clicked at the cursor's location
 */
export const useTrackMousePosition = (): void => {
  useEffectOnce(() => {
    globalThis.addEventListener('mousemove', (event: MouseEvent): void => {
      mousePosition.x = event.clientX
      mousePosition.y = event.clientY
    })
  })
}
