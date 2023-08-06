import { useDispatchTyped } from 'client/shared/hooks'
import { useEffectOnce, useUnmount } from 'react-use'
import {
  disableTopMenuItemsExceptItemId,
  enableTopMenuItems,
} from 'client/entities/nav'

export const useDisableNavItems = (): void => {
  const dispatch = useDispatchTyped()

  useEffectOnce(() => {
    dispatch(disableTopMenuItemsExceptItemId({ exceptItemId: 'Offers' }))
  })

  useUnmount(() => {
    dispatch(enableTopMenuItems())
  })
}
