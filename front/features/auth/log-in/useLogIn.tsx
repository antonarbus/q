import { useGetBookmarkListQuery } from '@front/entities/bookmark/api/useGetBookmarkListQuery'
import { navItemId } from '@front/entities/nav/navItemId'
import { navSlice } from '@front/entities/nav/navSlice'
import { useGetQuotationListQuery } from '@front/entities/quotation/api/useGetQuotationListQuery'
import { useLogInUserMutation } from '@front/entities/user/api/useLogInUserMutation'
import { userSlice } from '@front/entities/user/redux/userSlice'
import type { Signal } from '@preact/signals-react'
import { appSlice } from '@front/shared/appSlice'
import { buildSearchParams, getSearchParam } from '@front/shared/lib/react-router-dom/searchParams'
import { route } from '@front/shared/lib/react-router-dom/route'
import { reduxHolder } from '@front/shared/lib/redux/reduxHolder'
import { asyncDelay } from '@front/shared/util/asyncDelay'
import type { UseMutationResult } from '@tanstack/react-query'
import { useLocation, useNavigate } from 'react-router-dom'
import { useUpdateEffect } from 'react-use'
import { toast } from 'sonner'

type Props = {
  emailSignal: Signal<string>
  passwordSignal: Signal<string>
  slideOut: () => Promise<void>
}

type Res = {
  handleSubmit: (event: React.SubmitEvent) => void
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
      reduxHolder.dispatch(
        userSlice.actions.setAccessToken({
          accessToken: logInUserMutation.data.accessJwtToken,
        }),
      )

      reduxHolder.dispatch(
        userSlice.actions.rememberLoggedUser({
          email: logInUserMutation.data.email,
          roles: logInUserMutation.data.roles,
        }),
      )

      reduxHolder.dispatch(navSlice.actions.hideNavItems({ navItemIds: [navItemId.login] }))

      reduxHolder.dispatch(navSlice.actions.showNavItems({ navItemIds: [navItemId.profile] }))

      const isSuperAdmin = logInUserMutation.data.roles.includes('super-admin') === true

      if (isSuperAdmin === true) {
        reduxHolder.dispatch(navSlice.actions.showNavItems({ navItemIds: ['admin'] }))

        reduxHolder.dispatch(navSlice.actions.showAdminIcon())
      } else {
        reduxHolder.dispatch(navSlice.actions.hideNavItems({ navItemIds: ['admin'] }))

        reduxHolder.dispatch(navSlice.actions.showUserIcon())
      }

      const isQuotationListPage = location.pathname.includes(route.quotationList)

      if (isQuotationListPage === true) {
        getQuotationListQuery.refetch()
      }

      const isBookmarkListPage = location.pathname.includes(route.bookmarkList)

      if (isBookmarkListPage === true) {
        getBookmarkListQuery.refetch()
      }

      if (reduxHolder.getState().quotation.permissionLevel === 'FORBIDDEN') {
        reduxHolder.dispatch(
          appSlice.actions.setShouldLoadQuotation({
            yesOrNo: 'yes',
            from: 'server',
          }),
        )
      }

      const slideOutAndChangeUrl = async (): Promise<void> => {
        await asyncDelay(1000)
        await props.slideOut()

        const redirectTo = getSearchParam('redirect')

        if (redirectTo !== null) {
          await navigate(`../${redirectTo}${buildSearchParams({ shouldSlide: 'true' })}`)
          return
        }

        await navigate('..')
      }

      slideOutAndChangeUrl()
    }
  }, [logInUserMutation.isSuccess])

  useUpdateEffect(() => {
    if (logInUserMutation.isError === true) {
      reduxHolder.dispatch(userSlice.actions.setAccessToken({ accessToken: null }))

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
        toast.info('Account registered but not activated. Check mailbox or spam.')

        return
      }

      toast.error('Internal error')
    }
  }, [logInUserMutation.isError])

  const handleSubmit = (event: React.SubmitEvent): void => {
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
