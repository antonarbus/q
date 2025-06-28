import type { ReqBody as Payload } from '@back/api/user/deleteUserHandler'
import { IconButton, Tooltip } from '@mui/material'
import { MdLogin } from 'react-icons/md'
import { useUpdateEffect } from 'react-use'
import { RotatingLoaderIcon } from '@shared/components/RotatingLoaderIcon'
import { toast } from 'sonner'
import { useLogInMutation, userRole, userSlice } from '@entities/user'
import { useGetQuotationsQuery } from '@entities/quotation'
import { useGetBookmarksQuery } from '@entities/bookmark'
import { useLocation } from 'react-router-dom'
import { dispatch } from '@shared/lib/redux'
import { navSlice } from '@shared/nav'
import { navItemId } from '@shared/consts/navItemId'
import { route } from '@shared/consts/route'

export const LogInAsUserButton = ({ email }: Payload): React.ReactNode => {
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
      if (data.accessJwtToken === undefined) {
        return
      }

      if (data.email === undefined) {
        return
      }

      dispatch(
        userSlice.actions.setAccessToken({
          accessToken: data.accessJwtToken,
        }),
      )

      dispatch(
        userSlice.actions.rememberLoggedUser({
          email: data.email,
          roles: data.roles ?? [userRole.user],
        }),
      )

      dispatch(navSlice.actions.hideNavItems({ navItemIds: [navItemId.login] }))

      dispatch(
        navSlice.actions.showNavItems({
          navItemIds: [navItemId.profile],
        }),
      )

      const isSuperAdmin = data.roles?.includes(userRole.superAdmin) === true

      if (isSuperAdmin === true) {
        dispatch(navSlice.actions.showNavItems({ navItemIds: ['admin'] }))
      } else {
        dispatch(navSlice.actions.hideNavItems({ navItemIds: ['admin'] }))
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

      if (data.message === 'super-admin on behalf of user') {
        toast.success(`Logged as ${data.email}`)
      }
    }
  }, [isSuccess])

  useUpdateEffect(() => {
    if (isError === true) {
      toast.error(error.response?.data.message)
    }
  }, [isError])

  return (
    <Tooltip
      enterDelay={500}
      enterNextDelay={500}
      placement='bottom'
      title='Log in as super admin'
    >
      <IconButton
        onClick={() => {
          logIn({
            email,
            password: 'no password',
          })
        }}
        size='small'
      >
        {isPending === true ? <RotatingLoaderIcon /> : <MdLogin />}
      </IconButton>
    </Tooltip>
  )
}
