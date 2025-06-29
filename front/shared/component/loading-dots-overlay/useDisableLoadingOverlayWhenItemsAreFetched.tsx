import { useEffect } from 'react'
import { dispatch } from '@shared/lib/redux'
import { appSlice } from '@shared/appSlice'

type Props = {
  isFetched: boolean
}

export const useDisableLoadingOverlayWhenItemsAreFetched = ({
  isFetched,
}: Props): void => {
  useEffect(() => {
    if (isFetched === true) {
      dispatch(appSlice.actions.hideLoadingOverlay())
    }
  }, [isFetched])
}
