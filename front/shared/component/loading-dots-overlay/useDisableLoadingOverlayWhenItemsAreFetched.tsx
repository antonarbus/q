import { appSlice } from '@shared/appSlice'
import { dispatch } from '@shared/lib/redux'
import { useEffect } from 'react'

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
