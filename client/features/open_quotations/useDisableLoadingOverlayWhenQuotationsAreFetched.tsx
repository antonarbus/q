import { useEffect } from 'react'
import { loadingDotsOverlayTextSignal } from '@shared/loading_dots_overlay'

type Props = {
  isFetched: boolean
}

export const useDisableLoadingOverlayWhenQuotationsAreFetched = ({ isFetched }: Props): void => {
  useEffect(() => {
    if (!isFetched) return
    loadingDotsOverlayTextSignal.value = null
  }, [isFetched])
}
