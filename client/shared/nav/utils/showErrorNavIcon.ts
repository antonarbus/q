import { dispatch } from '@lib_instances/store'
import { navSlice } from '..'
import { type NavMenuItemIdKey } from '../type'

type Props = {
  navMenuItemIdKey: NavMenuItemIdKey
}

export const showErrorNavIcon = ({ navMenuItemIdKey }: Props): void => {
  setTimeout(() => {
    dispatch(navSlice.actions.hideLoadingIcon({ navMenuItemIdKey }))
    dispatch(navSlice.actions.showErrorIcon({ navMenuItemIdKey }))
  }, 1000)
  setTimeout(() => {
    dispatch(navSlice.actions.hideErrorIcon({ navMenuItemIdKey }))
  }, 3000)
}
