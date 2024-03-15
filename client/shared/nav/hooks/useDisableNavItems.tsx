import { dispatch } from '@lib_instances/store'
import { useEffectOnce, useUnmount } from 'react-use'
import { navSlice } from '../navSlice'

export const useDisableNavItems = (): void => {
  useEffectOnce(() => {
    dispatch(navSlice.actions.disableTopMenuItemsExceptItemId({ exceptItemId: 'quotations' }))
  })

  useUnmount(() => {
    dispatch(navSlice.actions.enableTopMenuItems())
  })
}
