import { dispatch } from '@shared/lib/redux'
import { useUpdateEffect } from 'react-use'
import { agGridSlice } from '../agGridSlice'

type Props = {
  isLoading: boolean
}

export const useShowLoadingJumpingDots = ({ isLoading }: Props): void => {
  useUpdateEffect(() => {
    if (isLoading === true) {
      dispatch(
        agGridSlice.actions.showLoadingOverlay({
          showLoader: true,
          text: 'Loading',
        }),
      )
    }
  }, [isLoading])
}
