import { dispatch } from '@lib_instances/store'
import { navSlice } from '..'
import { type NavMenuItemIdKey } from '../type'

type Props = {
  navMenuItemIdKey: NavMenuItemIdKey
}

export const showLoadingAtNavIcon = ({ navMenuItemIdKey }: Props): void => {
  dispatch(navSlice.actions.showLoadingIcon({ navMenuItemIdKey }))
}
