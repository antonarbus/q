import { useEffectOnce } from 'react-use'

/** Mouse coordinates tracked globally */
export const mousePosition = { x: 0, y: 0 }

/**
 * Hook to initialize global mouse position tracking.
 * Should be called once at the app root level.
 */
export const useInitMousePositionTracking = (): void => {
  useEffectOnce(() => {
    globalThis.addEventListener('mousemove', (event: MouseEvent): void => {
      mousePosition.x = event.clientX
      mousePosition.y = event.clientY
    })
  })
}
