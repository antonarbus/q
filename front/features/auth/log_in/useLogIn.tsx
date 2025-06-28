import { dispatch, getState } from '@shared/lib/redux'
import type { Signal } from '@preact/signals-react'
import type { UseMutationResult } from '@tanstack/react-query'
import { useLocation, useNavigate } from 'react-router-dom'
import { useUpdateEffect } from 'react-use'
import { useGetBookmarksQuery } from '@entities/bookmark'
import { useGetQuotationsQuery } from '@entities/quotation'
import { useLogInMutation, userRole, userSlice } from '@entities/user'
import { navItemId } from '@shared/consts/navItemId'
import { route } from '@shared/consts/route'
import { navSlice } from '@shared/nav'
import { toast } from 'sonner'
import { asyncDelay } from '@shared/utils/delay'
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

  const {
    mutate: logIn,
    isPending,
    data,
    isSuccess,
    isError,
    error,
  } = useLogInMutation()

  const location = useLocation()
  const { refetch: refetchQuotations } = useGetQuotationsQuery()
  const { refetch: refetchBookmarks } = useGetBookmarksQuery()

  useUpdateEffect(() => {
    if (isSuccess === true) {
      const { accessJwtToken, email, roles, message } = data

      if (data.name === 'MongooseError') {
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
        void refetchQuotations()
      }

      const isBookmarkListPage = location.pathname.includes(route.bookmarkList)

      if (isBookmarkListPage === true) {
        void refetchBookmarks()
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

        const navigateTo = getState().app.navigate.to

        if (navigateTo !== undefined) {
          void navigate(navigateTo)

          return
        }

        void navigate('..')
      }

      void slideOutAndChangeUrl()
    }
  }, [isSuccess])

  useUpdateEffect(() => {
    if (isError === true) {
      dispatch(userSlice.actions.setAccessToken({ accessToken: null }))

      if (error.response?.data.message === 'not registered') {
        toast.info('Not registered')

        return
      }

      if (error.response?.data.message === 'bad password') {
        toast.warning('Invalid credentials')

        return
      }

      if (error.response?.data.message === 'activation link sent again') {
        toast.info(
          'Account registered but not activated. Check mailbox or spam.',
        )

        return
      }

      toast.error('Internal error')
    }
  }, [isError])

  const onSubmit = (event: React.FormEvent): void => {
    event.preventDefault()

    logIn({
      email: emailSignal.value,
      password: passwordSignal.value,
    })
  }

  return { onSubmit, isPending, isSuccess, isError }
}
