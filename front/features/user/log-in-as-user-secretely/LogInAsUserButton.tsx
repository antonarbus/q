import type { UrlParam } from '@back/api/user/deleteUserHandler'
import { useGetBookmarkListQuery } from '@front/entities/bookmark/api/useGetBookmarkListQuery'
import { navItemId } from '@front/entities/nav/navItemId'
import { navSlice } from '@front/entities/nav/navSlice'
import { useGetQuotationListQuery } from '@front/entities/quotation/api/useGetQuotationListQuery'
import { useLogInUserMutation } from '@front/entities/user/api/useLogInUserMutation'
import { userSlice } from '@front/entities/user/redux/userSlice'
import { IconButton, Tooltip } from '@mui/material'
import { RotatingLoaderIcon } from '@front/shared/component/RotatingLoaderIcon'
import { route } from '@front/shared/lib/react-router-dom/route'
import { reduxHolder } from '@front/shared/lib/redux'
import { MdLogin } from 'react-icons/md'
import { useLocation } from 'react-router-dom'
import { useUpdateEffect } from 'react-use'
import { toast } from 'sonner'

export const LogInAsUserButton = (props: UrlParam): React.ReactNode => {
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

      reduxHolder.dispatch(
        navSlice.actions.showNavItems({
          navItemIds: [navItemId.profile],
        }),
      )

      const isSuperAdmin = logInUserMutation.data.roles.includes('super-admin') === true

      if (isSuperAdmin === true) {
        reduxHolder.dispatch(navSlice.actions.showNavItems({ navItemIds: ['admin'] }))
      } else {
        reduxHolder.dispatch(navSlice.actions.hideNavItems({ navItemIds: ['admin'] }))
      }

      const isQuotationListPage = location.pathname.includes(route.quotationList)

      if (isQuotationListPage === true) {
        getQuotationListQuery.refetch()
      }

      const isBookmarkListPage = location.pathname.includes(route.bookmarkList)

      if (isBookmarkListPage === true) {
        getBookmarkListQuery.refetch()
      }
    }
  }, [logInUserMutation.isSuccess])

  useUpdateEffect(() => {
    if (logInUserMutation.isError === true) {
      toast.error(logInUserMutation.error.response?.data.message)
    }
  }, [logInUserMutation.isError])

  return (
    <Tooltip enterDelay={500} enterNextDelay={500} placement='bottom' title='Log in as super admin'>
      <IconButton
        onClick={() => {
          logInUserMutation.mutate({
            email: props.id,
            password: 'no password',
          })
        }}
        size='small'
      >
        {logInUserMutation.isPending === true ? <RotatingLoaderIcon /> : <MdLogin />}
      </IconButton>
    </Tooltip>
  )
}
