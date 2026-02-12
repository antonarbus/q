import { useGetBookmarkListQuery } from '@entity/bookmark/api/useGetBookmarkListQuery'
import { navItemId } from '@entity/nav/navItemId'
import { navSlice } from '@entity/nav/navSlice'
import { useGetQuotationListQuery } from '@entity/quotation/api/useGetQuotationListQuery'
import { useLogInUserMutation } from '@entity/user/api/useLogInUserMutation'
import { userSlice } from '@entity/user/redux/userSlice'
import type { Signal } from '@preact/signals-react'
import { appSlice } from '@shared/appSlice'
import { route } from '@shared/lib/react-router-dom/route'
import { dispatch, getState } from '@shared/lib/redux'
import { asyncDelay } from '@shared/util/asyncDelay'
import type { UseMutationResult } from '@tanstack/react-query'
import type { SubmitEvent } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useUpdateEffect } from 'react-use'
import { toast } from 'sonner'

type Props = {
  emailSignal: Signal<string>
  passwordSignal: Signal<string>
  slideOut: () => Promise<void>
}

type Res = {
  handleSubmit: (e: SubmitEvent) => void
  isPending: UseMutationResult['isPending']
  isSuccess: UseMutationResult['isSuccess']
  isError: UseMutationResult['isError']
}

export const useLogIn = (props: Props): Res => {
  const navigate = useNavigate()

  const logInUserMutation = useLogInUserMutation()

  const location = useLocation()
  const getQuotationListQuery = useGetQuotationListQuery()
  const getBookmarkListQuery = useGetBookmarkListQuery()

  useUpdateEffect(() => {
    if (logInUserMutation.isSuccess === true) {
      dispatch(
        userSlice.actions.setAccessToken({
          accessToken: logInUserMutation.data.accessJwtToken,
        }),
      )

      dispatch(
        userSlice.actions.rememberLoggedUser({
          email: logInUserMutation.data.email,
          roles: logInUserMutation.data.roles,
        }),
      )

      dispatch(navSlice.actions.hideNavItems({ navItemIds: [navItemId.login] }))

      dispatch(
        navSlice.actions.showNavItems({ navItemIds: [navItemId.profile] }),
      )

      const isSuperAdmin =
        logInUserMutation.data.roles.includes('super-admin') === true

      if (isSuperAdmin === true) {
        dispatch(navSlice.actions.showNavItems({ navItemIds: ['admin'] }))
        dispatch(navSlice.actions.showAdminIcon())
      } else {
        dispatch(navSlice.actions.hideNavItems({ navItemIds: ['admin'] }))
        dispatch(navSlice.actions.showUserIcon())
      }

      const isQuotationListPage = location.pathname.includes(
        route.quotationList,
      )

      if (isQuotationListPage === true) {
        void getQuotationListQuery.refetch()
      }

      const isBookmarkListPage = location.pathname.includes(route.bookmarkList)

      if (isBookmarkListPage === true) {
        void getBookmarkListQuery.refetch()
      }

      if (getState().quotation.permissionLevel === 'FORBIDDEN') {
        dispatch(
          appSlice.actions.setShouldLoadQuotation({
            yesOrNo: 'yes',
            from: 'server',
          }),
        )
      }

      const slideOutAndChangeUrl = async (): Promise<void> => {
        await asyncDelay(1000)
        await props.slideOut()

        const navigateTo = getState().app.navigateState.to

        if (navigateTo !== undefined) {
          await navigate(navigateTo)
          dispatch(appSlice.actions.resetNavigateState())

          return
        }

        await navigate('..')
      }

      void slideOutAndChangeUrl()
    }
  }, [logInUserMutation.isSuccess])

  useUpdateEffect(() => {
    if (logInUserMutation.isError === true) {
      dispatch(userSlice.actions.setAccessToken({ accessToken: null }))

      const errorCode = logInUserMutation.error.response?.data.errorCode

      if (errorCode === 'NOT_REGISTERED') {
        toast.info('Not registered')

        return
      }

      if (errorCode === 'BAD_PASSWORD') {
        toast.warning('Invalid credentials')

        return
      }

      if (errorCode === 'ACTIVATION_LINK_SENT_AGAIN') {
        toast.info(
          'Account registered but not activated. Check mailbox or spam.',
        )

        return
      }

      toast.error('Internal error')
    }
  }, [logInUserMutation.isError])

  const handleSubmit = (event: SubmitEvent): void => {
    event.preventDefault()

    logInUserMutation.mutate({
      email: props.emailSignal.value,
      password: props.passwordSignal.value,
    })
  }

  return {
    handleSubmit,
    isPending: logInUserMutation.isPending,
    isSuccess: logInUserMutation.isSuccess,
    isError: logInUserMutation.isError,
  }
}
