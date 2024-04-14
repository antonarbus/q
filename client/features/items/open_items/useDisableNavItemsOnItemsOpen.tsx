import { dispatch } from '@lib_instances/store'
import { useEffectOnce, useUnmount } from 'react-use'
import { navItemId } from '@shared/consts/navItemId'
import { navSlice } from '@shared/nav'

export const useDisableNavItemsOnItemsOpen = (): void => {
  useEffectOnce(() => {
    dispatch(navSlice.actions.disableNavItems({
      navItemIdKeys: [
        navItemId.save,
        navItemId.pdf,
        navItemId.share,
        navItemId.items,
        navItemId.insert,
      ],
    }))
  })

  useUnmount(() => {
    dispatch(navSlice.actions.enableAllTopNavItems())
  })
}
