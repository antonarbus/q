import { useDispatchTyped } from 'client/shared/hooks'
import { useEffectOnce, useUnmount } from 'react-use'
import { disableTopMenuItemsExceptItemId, enableTopMenuItems } from 'client/features/nav/navSlice'

export const useDisableNavItems = () => {
  const dispatch = useDispatchTyped()

  useEffectOnce(() => {
    dispatch(disableTopMenuItemsExceptItemId({ exceptItemId: 'Offers' }))
  })

  useUnmount(() => {
    dispatch(enableTopMenuItems())
  })
}
