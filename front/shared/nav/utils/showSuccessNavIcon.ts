import { dispatch } from '@shared/lib/redux'
import { navSlice } from '..'
import type { NavItemKey } from '../type'

type Props = {
  navItemKey: NavItemKey
}

export const showSuccessNavIcon = ({ navItemKey }: Props): void => {
  setTimeout(() => {
    dispatch(navSlice.actions.stopLoadingIcon({ navItemKey }))
    dispatch(navSlice.actions.showSuccessIcon({ navItemKey }))
  }, 1000)

  setTimeout(() => {
    dispatch(navSlice.actions.hideSuccessIcon({ navItemKey }))
  }, 3000)
}
