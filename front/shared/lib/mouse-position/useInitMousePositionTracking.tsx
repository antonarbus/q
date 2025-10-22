import { useEffectOnce } from 'react-use'
import { trackMousePosition } from './mousePosition'

/**
 * Hook to initialize global mouse position tracking.
 * Should be called once at the app root level.
 */
export const useInitMousePositionTracking = (): void => {
  useEffectOnce(() => {
    trackMousePosition()
  })
}
