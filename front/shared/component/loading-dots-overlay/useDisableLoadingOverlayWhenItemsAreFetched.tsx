import { appSlice } from '@front/shared/appSlice'
import { reduxHolder } from '@front/shared/lib/redux'
import { useEffect } from 'react'

type Props = {
  isFetched: boolean
}

export const useDisableLoadingOverlayWhenItemsAreFetched = (
  props: Props,
): void => {
  useEffect(() => {
    if (props.isFetched === true) {
      reduxHolder.dispatch(appSlice.actions.hideLoadingOverlay())
    }
  }, [props.isFetched])
}
