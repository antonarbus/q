import { dispatch } from '@shared/lib/redux'
import { navSlice } from '..'
import type { NavItemIdKey } from '../type'

type Props = {
  navMenuItemIdKey: NavItemIdKey
}

export const showLoadingNavIcon = ({ navMenuItemIdKey }: Props): void => {
  dispatch(navSlice.actions.startLoadingIcon({ navMenuItemIdKey }))
}
