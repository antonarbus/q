import { useEffectOnce } from 'react-use'
import type { NavigateState } from '@shared/types/NavigateState'
import { useLocation, type Location } from 'react-router-dom'

export const useFixScrollPositionOnModalOpen = (): void => {
  const location = useLocation() as Location<NavigateState>
  const scrollTop = location.state?.scrollTop

  useEffectOnce(() => {
    if (scrollTop) {
      document.body.scrollTop = scrollTop
    }
  })
}
