import { dispatch } from '@lib_instances/store'
import { useEffectOnce, useUnmount } from 'react-use'
import { navSlice } from '@shared/nav'

export const useDisableNavItemsOnQuotationsOpen = (): void => {
  useEffectOnce(() => {
    dispatch(navSlice.actions.disableTopNavItem({ navMenuItemIdKey: 'save' }))
    dispatch(navSlice.actions.disableTopNavItem({ navMenuItemIdKey: 'pdf' }))
    dispatch(navSlice.actions.disableTopNavItem({ navMenuItemIdKey: 'share' }))
    dispatch(navSlice.actions.disableTopNavItem({ navMenuItemIdKey: 'quotations' }))
  })

  useUnmount(() => {
    dispatch(navSlice.actions.enableTopMenuItems())
  })
}
