import { dispatch } from '@shared/lib/redux'
import { useNavigate } from 'react-router-dom'
import { useEffectOnce, useUpdateEffect } from 'react-use'
import { deleteBookmarksCache } from '@entities/bookmark'
import { deleteQuotationsCache } from '@entities/quotation'
import { useLogOutMutation, userSlice } from '@entities/user'
import { navItemId } from '@shared/const/navItemId'
import { navSlice } from '@shared/nav'
import { toast } from 'sonner'
import { appSlice } from '@shared/appSlice'

export const Logout = (): React.ReactNode => {
  const navigate = useNavigate()
  const { mutate: logOut, isPending, isSuccess, isError } = useLogOutMutation()

  useEffectOnce(logOut)

  useUpdateEffect(() => {
    if (isPending === true) {
      dispatch(
        appSlice.actions.showLoadingOverlay({
          shouldShowLoader: true,
          text: 'Logging out',
        }),
      )
    }
  }, [isPending])

  useUpdateEffect(() => {
    if (isSuccess === true) {
      deleteQuotationsCache()
      deleteBookmarksCache()

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
  }, [isSuccess])

  useUpdateEffect(() => {
    if (isError === true) {
      toast.error('Problems with logging out')

      setTimeout(() => {
        dispatch(appSlice.actions.hideLoadingOverlay())
        void navigate('..')
      }, 1000)
    }
  }, [isError])

  return null
}
