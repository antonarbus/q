import { dispatch } from '@lib_instances/store'
import { useEffectOnce, useUnmount } from 'react-use'
import { navMenuItemId } from '@shared/consts/navMenuItemId'
import { navSlice } from '@shared/nav'

export const useDisableNavItemsOnQuotationsOpen = (): void => {
  useEffectOnce(() => {
    dispatch(navSlice.actions.disableTopNavItem({ navMenuItemIdKey: navMenuItemId.save }))
    dispatch(navSlice.actions.disableTopNavItem({ navMenuItemIdKey: navMenuItemId.pdf }))
    dispatch(navSlice.actions.disableTopNavItem({ navMenuItemIdKey: navMenuItemId.share }))
    dispatch(navSlice.actions.disableTopNavItem({ navMenuItemIdKey: navMenuItemId.quotations }))
    dispatch(navSlice.actions.disableTopNavItem({ navMenuItemIdKey: navMenuItemId.insert }))
  })

  useUnmount(() => {
    dispatch(navSlice.actions.enableTopMenuItems())
  })
}
