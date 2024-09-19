import { dispatch } from '@lib_instances/store'
import { navSlice } from '..'
import type { NavItemIdKey } from '../type'

type Props = {
  navMenuItemIdKey: NavItemIdKey
}

export const showSuccessNavIcon = ({ navMenuItemIdKey }: Props): void => {
  setTimeout(() => {
    dispatch(navSlice.actions.stopLoadingIcon({ navMenuItemIdKey }))
    dispatch(navSlice.actions.showSuccessIcon({ navMenuItemIdKey }))
  }, 1000)

  setTimeout(() => {
    dispatch(navSlice.actions.hideSuccessIcon({ navMenuItemIdKey }))
  }, 3000)
}
