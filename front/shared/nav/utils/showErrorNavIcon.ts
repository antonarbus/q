import { dispatch } from '@lib_instances/store'
import { navSlice } from '..'
import type { NavItemIdKey } from '../type'

type Props = {
  navMenuItemIdKey: NavItemIdKey
}

export const showErrorNavIcon = ({ navMenuItemIdKey }: Props): void => {
  setTimeout(() => {
    dispatch(navSlice.actions.stopLoadingIcon({ navMenuItemIdKey }))
    dispatch(navSlice.actions.showErrorIcon({ navMenuItemIdKey }))
  }, 1000)

  setTimeout(() => {
    dispatch(navSlice.actions.hideErrorIcon({ navMenuItemIdKey }))
  }, 3000)
}
