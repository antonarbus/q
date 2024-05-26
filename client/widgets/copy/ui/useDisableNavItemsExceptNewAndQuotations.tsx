import { dispatch } from '@lib_instances/store'
import { useEffectOnce, useUnmount } from 'react-use'
import { navItemId } from '@shared/consts/navItemId'
import { navSlice } from '@shared/nav'

export const useDisableNavItemsExceptNewAndQuotations = (): void => {
  useEffectOnce(() => {
    dispatch(
      navSlice.actions.disableAllTopNavItems({
        exceptNavItemIdKeys: [
          navItemId.quotations,
          navItemId.new,
          navItemId.back,
        ],
      }),
    )
  })

  useUnmount(() => {
    dispatch(navSlice.actions.enableAllTopNavItems())
  })
}
