import { useEffectOnce } from 'react-use'
import type { OpenQuotationModalNavigateState } from '.'
import { useLocation, type Location } from 'react-router-dom'

export const useFixScrollPositionOnModalOpen = (): void => {
  const location = useLocation() as Location<OpenQuotationModalNavigateState>
  const scrollTop = location.state?.scrollTop

  useEffectOnce(() => {
    if (scrollTop) {
      document.body.scrollTop = scrollTop
    }
  })
}
