import { dispatch } from '@lib_instances/store'
import { useEffectOnce, useUnmount } from 'react-use'
import { navItemId } from '@shared/consts/navItemId'
import { navSlice } from '@shared/nav'

export const useDisableNavItemsExceptQuotations = (): void => {
  useEffectOnce(() => {
    dispatch(navSlice.actions.disableAllTopNavItems({ exceptNavItemIdKeys: [navItemId.quotations] }))
  })

  useUnmount(() => {
    dispatch(navSlice.actions.enableAllTopNavItems())
  })
}
