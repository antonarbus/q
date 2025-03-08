import type { ReqBody as Payload } from '@back/api/user/deleteUserRouter'
import { IconButton, Tooltip } from '@mui/material'
import { MdLogin } from 'react-icons/md'
import { useUpdateEffect } from 'react-use'
import { RotatingLoaderIcon } from '@shared/components/RotatingLoaderIcon'
import { notify } from '@shared/toast'
import { useLogInMutation, userSlice } from '@entities/user'
import { useGetQuotationsQuery } from '@entities/quotation'
import { useGetBookmarksQuery } from '@entities/bookmark'
import type { NavigateState } from '@shared/types/NavigateState'
import { type Location, useLocation, useParams } from 'react-router-dom'
import { dispatch } from '@shared/lib/redux'
import { navSlice } from '@shared/nav'
import { navItemKey } from '@shared/consts/navItemKey'
import { route } from '@shared/consts/route'
import { appSlice } from '@shared/appSlice'

export const LogInAsUserButton = ({ email }: Payload): React.ReactNode => {
  const { quotationId } = useParams()

  const {
    mutate: logIn,
    isPending,
    data,
    isSuccess,
    isError,
    error,
  } = useLogInMutation()

  const location = useLocation() as Location<NavigateState>
  const { refetch: refetchQuotations } = useGetQuotationsQuery()
  const { refetch: refetchBookmarks } = useGetBookmarksQuery()

  useUpdateEffect(() => {
    if (isSuccess) {
      if (!data.accessJwtToken) {
        return
      }

      if (!data.email) {
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
          roles: data.roles ?? ['user'],
        }),
      )

      dispatch(
        navSlice.actions.hideNavItems({ navItemIdKeys: [navItemKey.login] }),
      )

      dispatch(
        navSlice.actions.showNavItems({
          navItemIdKeys: [navItemKey.profile],
        }),
      )

      if (data.roles?.includes('super-admin')) {
        dispatch(navSlice.actions.showNavItems({ navItemIdKeys: ['admin'] }))
      } else {
        dispatch(navSlice.actions.hideNavItems({ navItemIdKeys: ['admin'] }))
      }

      if (location.pathname.includes(route.quotations)) {
        void refetchQuotations()
      }

      if (location.pathname.includes(route.bookmarks)) {
        void refetchBookmarks()
      }

      if (quotationId) {
        dispatch(appSlice.actions.reRenderQuotation())
      }

      if (data.message === 'super-admin on behalf of user') {
        notify({
          msg: `Logged as ${data.email}`,
          type: 'success',
          theme: 'light',
        })
      }
    }
  }, [isSuccess])

  useUpdateEffect(() => {
    if (isError) {
      notify({
        msg: error.response?.data.message,
        type: 'error',
        theme: 'light',
      })
    }
  }, [isError])

  return (
    <Tooltip
      title='Log in'
      placement='bottom'
      enterDelay={500}
      enterNextDelay={500}
    >
      <IconButton
        size='small'
        onClick={() => {
          logIn({
            email,
            password: 'no password',
          })
        }}
      >
        {!isPending && <MdLogin />}
        {isPending && <RotatingLoaderIcon />}
      </IconButton>
    </Tooltip>
  )
}
