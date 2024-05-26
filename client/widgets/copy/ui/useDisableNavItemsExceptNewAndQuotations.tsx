import { dispatch } from '@lib_instances/store'
import { useEffectOnce, useUnmount } from 'react-use'
import { navItemKey } from '@shared/consts/navItemKey'
import { navSlice } from '@shared/nav'

export const useDisableNavItemsExceptNewAndQuotations = (): void => {
  useEffectOnce(() => {
    dispatch(
      navSlice.actions.disableAllTopNavItems({
        exceptNavItemIdKeys: [
          navItemKey.quotations,
          navItemKey.new,
          navItemKey.back,
        ],
      }),
    )
  })

  useUnmount(() => {
    dispatch(navSlice.actions.enableAllTopNavItems())
  })
}
