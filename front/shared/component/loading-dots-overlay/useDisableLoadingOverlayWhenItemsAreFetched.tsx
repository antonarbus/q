import { appSlice } from '@front/shared/appSlice'
import { dispatch } from '@front/shared/lib/redux'
import { useEffect } from 'react'

type Props = {
  isFetched: boolean
}

export const useDisableLoadingOverlayWhenItemsAreFetched = (
  props: Props,
): void => {
  useEffect(() => {
    if (props.isFetched === true) {
      dispatch(appSlice.actions.hideLoadingOverlay())
    }
  }, [props.isFetched])
}
