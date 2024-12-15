import { dispatch } from '@shared/lib/redux'
import { useNavigate } from 'react-router-dom'
import { useEffectOnce, useUpdateEffect } from 'react-use'
import { deleteBookmarksCache } from '@entities/bookmark'
import { deleteQuotationsCache } from '@entities/quotation'
import { useLogOutMutation, userSlice } from '@entities/user'
import { navItemKey } from '@shared/consts/navItemKey'
import { navSlice } from '@shared/nav'
import { notify } from '@shared/toast'
import { appSlice } from '@shared/appSlice'

export const Logout = (): React.JSX.Element => {
  const navigate = useNavigate()
  const { mutate: logOut, isPending, isSuccess, isError } = useLogOutMutation()

  useEffectOnce(logOut)

  useUpdateEffect(() => {
    if (isPending) {
      dispatch(
        appSlice.actions.showLoadingOverlay({
          showLoader: true,
          text: 'Logging out',
        }),
      )
    }
  }, [isPending])

  useUpdateEffect(() => {
    if (isSuccess) {
      deleteQuotationsCache()
      deleteBookmarksCache()

      dispatch(userSlice.actions.setAccessToken({ accessToken: null }))
      dispatch(userSlice.actions.forgetLoggedUser())

      dispatch(
        navSlice.actions.showNavItems({ navItemIdKeys: [navItemKey.login] }),
      )

      dispatch(
        navSlice.actions.hideNavItems({
          navItemIdKeys: [navItemKey.profile],
        }),
      )

      dispatch(navSlice.actions.hideNavItems({ navItemIdKeys: ['admin'] }))

      setTimeout(() => {
        dispatch(appSlice.actions.hideLoadingOverlay())
        void navigate('..')
      }, 1000)
    }
  }, [isSuccess])

  useUpdateEffect(() => {
    if (isError) {
      notify({
        msg: 'Problems with logging out',
        type: 'error',
        theme: 'light',
      })

      setTimeout(() => {
        dispatch(appSlice.actions.hideLoadingOverlay())
        void navigate('..')
      }, 1000)
    }
  }, [isError])

  return <></>
}
