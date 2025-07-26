import { dispatch, getState } from '@shared/lib/redux'
import type { Signal } from '@preact/signals-react'
import type { UseMutationResult } from '@tanstack/react-query'
import { useLocation, useNavigate } from 'react-router-dom'
import { useUpdateEffect } from 'react-use'
import { useGetBookmarkListQuery } from '@entities/bookmark'
import { useGetQuotationListQuery } from '@entities/quotation'
import { useLogInUserMutation, userRole, userSlice } from '@entities/user'
import { navItemId } from '@shared/const/navItemId'
import { route } from '@shared/const/route'
import { navSlice } from '@shared/nav'
import { toast } from 'sonner'
import { asyncDelay } from '@shared/util/delay'
import { appSlice } from '@shared/appSlice'

type Props = {
  emailSignal: Signal<string>
  passwordSignal: Signal<string>
  slideOut: () => Promise<void>
}

type Res = {
  onSubmit: (e: React.FormEvent) => void
  isPending: UseMutationResult['isPending']
  isSuccess: UseMutationResult['isSuccess']
  isError: UseMutationResult['isError']
}

export const useLogIn = ({
  emailSignal,
  passwordSignal,
  slideOut,
}: Props): Res => {
  const navigate = useNavigate()

  const logInUserMutation = useLogInUserMutation()

  const location = useLocation()
  const getQuotationListQuery = useGetQuotationListQuery()
  const getBookmarkListQuery = useGetBookmarkListQuery()

  useUpdateEffect(() => {
    if (logInUserMutation.isSuccess === true) {
      const { accessJwtToken, email, roles, message, name } =
        logInUserMutation.data

      if (name === 'MongooseError') {
        toast.warning('Database error')

        return
      }

      if (message !== 'good password') {
        return
      }

      if (accessJwtToken === undefined) {
        return
      }

      if (email === undefined) {
        return
      }

      dispatch(
        userSlice.actions.setAccessToken({
          accessToken: accessJwtToken,
        }),
      )

      dispatch(
        userSlice.actions.rememberLoggedUser({
          email,
          roles: roles ?? [userRole.user],
        }),
      )

      dispatch(navSlice.actions.hideNavItems({ navItemIds: [navItemId.login] }))

      dispatch(
        navSlice.actions.showNavItems({ navItemIds: [navItemId.profile] }),
      )

      const isSuperAdmin = roles?.includes(userRole.superAdmin) === true

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

      if (getState().quotation.permissionLevel === 'Forbidden') {
        dispatch(
          appSlice.actions.setShouldLoadQuotation({
            yesOrNo: 'yes',
            from: 'server',
          }),
        )
      }

      const slideOutAndChangeUrl = async (): Promise<void> => {
        await asyncDelay(1000)
        await slideOut()

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

      if (logInUserMutation.error.response?.data.message === 'not registered') {
        toast.info('Not registered')

        return
      }

      if (logInUserMutation.error.response?.data.message === 'bad password') {
        toast.warning('Invalid credentials')

        return
      }

      if (
        logInUserMutation.error.response?.data.message ===
        'activation link sent again'
      ) {
        toast.info(
          'Account registered but not activated. Check mailbox or spam.',
        )

        return
      }

      toast.error('Internal error')
    }
  }, [logInUserMutation.isError])

  const onSubmit = (event: React.FormEvent): void => {
    event.preventDefault()

    logInUserMutation.mutate({
      email: emailSignal.value,
      password: passwordSignal.value,
    })
  }

  return {
    onSubmit,
    isPending: logInUserMutation.isPending,
    isSuccess: logInUserMutation.isSuccess,
    isError: logInUserMutation.isError,
  }
}
