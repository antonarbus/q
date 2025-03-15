import { dispatch } from '@shared/lib/redux'
import { navSlice } from '..'
import type { NavItemKey } from '../type'

type Props = {
  navItemKey: NavItemKey
}

export const showLoadingNavIcon = ({ navItemKey }: Props): void => {
  dispatch(navSlice.actions.startLoadingIcon({ navItemKey }))
}
