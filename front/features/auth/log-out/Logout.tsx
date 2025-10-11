import { deleteBookmarkListCache } from '@entities/bookmark'
import { deleteQuotationListCache } from '@entities/quotation'
import { useLogOutUserMutation, userSlice } from '@entities/user'
import { appSlice } from '@shared/appSlice'
import { dispatch } from '@shared/lib/redux'
import { navItemId } from '@shared/nav/navItemId'
import { navSlice } from '@shared/nav/navSlice'
import type { ReactNode } from 'react'
import { useNavigate } from 'react-router-dom'
import { useEffectOnce, useUpdateEffect } from 'react-use'
import { toast } from 'sonner'

export const Logout = (): ReactNode => {
  const navigate = useNavigate()

  const logOutUserMutation = useLogOutUserMutation()

  useEffectOnce(logOutUserMutation.mutate)

  useUpdateEffect(() => {
    if (logOutUserMutation.isPending === true) {
      dispatch(
        appSlice.actions.showLoadingOverlay({
          shouldShowLoader: true,
          text: 'Logging out',
        }),
      )
    }
  }, [logOutUserMutation.isPending])

  useUpdateEffect(() => {
    if (logOutUserMutation.isSuccess === true) {
      deleteQuotationListCache()
      deleteBookmarkListCache()

      dispatch(userSlice.actions.setAccessToken({ accessToken: null }))
      dispatch(userSlice.actions.forgetLoggedUser())

      dispatch(navSlice.actions.showNavItems({ navItemIds: [navItemId.login] }))

      dispatch(
        navSlice.actions.hideNavItems({
          navItemIds: [navItemId.profile],
        }),
      )

      dispatch(navSlice.actions.hideNavItems({ navItemIds: ['admin'] }))

      setTimeout(() => {
        dispatch(appSlice.actions.hideLoadingOverlay())
        void navigate('..')
      }, 1000)
    }
  }, [logOutUserMutation.isSuccess])

  useUpdateEffect(() => {
    if (logOutUserMutation.isError === true) {
      toast.error('Problems with logging out')

      setTimeout(() => {
        dispatch(appSlice.actions.hideLoadingOverlay())
        void navigate('..')
      }, 1000)
    }
  }, [logOutUserMutation.isError])

  return null
}
