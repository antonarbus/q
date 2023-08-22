import { useDispatchTyped } from 'client/shared/hooks'
import { useEffectOnce, useUnmount } from 'react-use'
import { navSlice } from 'client/entities/nav'

export const useDisableNavItems = (): void => {
  const dispatch = useDispatchTyped()

  useEffectOnce(() => {
    dispatch(navSlice.actions.disableTopMenuItemsExceptItemId({ exceptItemId: 'Offers' }))
  })

  useUnmount(() => {
    dispatch(navSlice.actions.enableTopMenuItems())
  })
}
