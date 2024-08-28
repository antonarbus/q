import { loadingTableOverlaySignal } from '@shared/components/LoadingTableOverlay'
import { useUpdateEffect } from 'react-use'

type Props = {
  isLoading: boolean
}

export const useShowLoadingJumpingDots = ({ isLoading }: Props): void => {
  useUpdateEffect(() => {
    if (isLoading) {
      loadingTableOverlaySignal.value = {
        areJumpingDotsShown: true,
        text: 'Loading',
      }
    }
  }, [isLoading])
}
