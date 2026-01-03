import type { ReqBody as Payload } from '@back/api/user/deleteUserHandler'
import { useGetBookmarkListQuery } from '@entities/bookmark/api/useGetBookmarkListQuery'
import { navItemId } from '@entities/nav/navItemId'
import { navSlice } from '@entities/nav/navSlice'
import { useGetQuotationListQuery } from '@entities/quotation/api/useGetQuotationListQuery'
import { useLogInUserMutation } from '@entities/user/api/useLogInUserMutation'
import { userSlice } from '@entities/user/redux/userSlice'
import { IconButton, Tooltip } from '@mui/material'
import { RotatingLoaderIcon } from '@shared/component/RotatingLoaderIcon'
import { route } from '@shared/lib/react-router-dom/route'
import { dispatch } from '@shared/lib/redux'
import type { ReactNode } from 'react'
import { MdLogin } from 'react-icons/md'
import { useLocation } from 'react-router-dom'
import { useUpdateEffect } from 'react-use'
import { toast } from 'sonner'

export const LogInAsUserButton = (props: Payload): ReactNode => {
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
        navSlice.actions.showNavItems({
          navItemIds: [navItemId.profile],
        }),
      )

      const isSuperAdmin =
        logInUserMutation.data.roles.includes('super-admin') === true

      if (isSuperAdmin === true) {
        dispatch(navSlice.actions.showNavItems({ navItemIds: ['admin'] }))
      } else {
        dispatch(navSlice.actions.hideNavItems({ navItemIds: ['admin'] }))
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
    }
  }, [logInUserMutation.isSuccess])

  useUpdateEffect(() => {
    if (logInUserMutation.isError === true) {
      toast.error(logInUserMutation.error.response?.data.message)
    }
  }, [logInUserMutation.isError])

  return (
    <Tooltip
      enterDelay={500}
      enterNextDelay={500}
      placement='bottom'
      title='Log in as super admin'
    >
      <IconButton
        onClick={() => {
          logInUserMutation.mutate({
            email: props.email,
            password: 'no password',
          })
        }}
        size='small'
      >
        {logInUserMutation.isPending === true ? (
          <RotatingLoaderIcon />
        ) : (
          <MdLogin />
        )}
      </IconButton>
    </Tooltip>
  )
}
