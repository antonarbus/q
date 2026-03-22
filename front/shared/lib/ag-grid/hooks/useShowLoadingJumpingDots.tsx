import { dispatch } from '@front/shared/lib/redux'
import { useUpdateEffect } from 'react-use'
import { agGridSlice } from '../agGridSlice'

type Props = {
  isLoading: boolean
}

export const useShowLoadingJumpingDots = (props: Props): void => {
  useUpdateEffect(() => {
    if (props.isLoading === true) {
      dispatch(
        agGridSlice.actions.showLoadingOverlay({
          showLoader: true,
          text: 'Loading',
        }),
      )
    }
  }, [props.isLoading])
}
