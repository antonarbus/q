import type { ReqBody as Payload } from '@back/api/user/deleteUserHandler'
import { IconButton, Tooltip } from '@mui/material'
import { MdLogin } from 'react-icons/md'
import { useUpdateEffect } from 'react-use'
import { RotatingLoaderIcon } from '@shared/component/RotatingLoaderIcon'
import { toast } from 'sonner'
import { useLogInUserMutation, userRole, userSlice } from '@entities/user'
import { useGetQuotationListQuery } from '@entities/quotation'
import { useGetBookmarkListQuery } from '@entities/bookmark'
import { useLocation } from 'react-router-dom'
import { dispatch } from '@shared/lib/redux'
import { navSlice } from '@shared/nav'
import { navItemId } from '@shared/const/navItemId'
import { route } from '@shared/const/route'

export const LogInAsUserButton = ({ email }: Payload): React.ReactNode => {
  const logInUserMutation = useLogInUserMutation()
  const location = useLocation()
  const getQuotationListQuery = useGetQuotationListQuery()
  const getBookmarkListQuery = useGetBookmarkListQuery()

  useUpdateEffect(() => {
    if (logInUserMutation.isSuccess === true) {
      if (logInUserMutation.data.accessJwtToken === undefined) {
        return
      }

      if (logInUserMutation.data.email === undefined) {
        return
      }

      dispatch(
        userSlice.actions.setAccessToken({
          accessToken: logInUserMutation.data.accessJwtToken,
        }),
      )

      dispatch(
        userSlice.actions.rememberLoggedUser({
          email: logInUserMutation.data.email,
          roles: logInUserMutation.data.roles ?? [userRole.user],
        }),
      )

      dispatch(navSlice.actions.hideNavItems({ navItemIds: [navItemId.login] }))

      dispatch(
        navSlice.actions.showNavItems({
          navItemIds: [navItemId.profile],
        }),
      )

      const isSuperAdmin =
        logInUserMutation.data.roles?.includes(userRole.superAdmin) === true

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

      if (logInUserMutation.data.message === 'super-admin on behalf of user') {
        toast.success(`Logged as ${logInUserMutation.data.email}`)
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
            email,
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
