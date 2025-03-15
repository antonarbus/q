import { dispatch } from '@shared/lib/redux'
import { navSlice } from '..'
import type { NavItemKey } from '../type'

type Props = {
  navItemKey: NavItemKey
}

export const showErrorNavIcon = ({ navItemKey }: Props): void => {
  setTimeout(() => {
    dispatch(navSlice.actions.stopLoadingIcon({ navItemKey }))
    dispatch(navSlice.actions.showErrorIcon({ navItemKey }))
  }, 1000)

  setTimeout(() => {
    dispatch(navSlice.actions.hideErrorIcon({ navItemKey }))
  }, 3000)
}
