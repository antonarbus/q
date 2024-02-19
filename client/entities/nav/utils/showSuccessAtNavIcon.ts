import { dispatch } from '@lib_instances/store'
import { navSlice } from '..'
import { type NavMenuItemIdKey } from '../type'

type Props = {
  navMenuItemIdKey: NavMenuItemIdKey
}

export const showSuccessAtNavIcon = ({ navMenuItemIdKey }: Props): void => {
  setTimeout(() => {
    dispatch(navSlice.actions.hideLoadingIcon({ navMenuItemIdKey }))
    dispatch(navSlice.actions.showSuccessIcon({ navMenuItemIdKey }))
  }, 1000)
  setTimeout(() => {
    dispatch(navSlice.actions.hideSuccessIcon({ navMenuItemIdKey }))
  }, 3000)
}
