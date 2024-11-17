import type { ReqBody as Payload } from '@back/api/user/deleteUserRouter'
import { IconButton, Tooltip } from '@mui/material'
import { MdLogin } from 'react-icons/md'
import { useUpdateEffect } from 'react-use'
import { RotatingLoaderIcon } from '@shared/components/RotatingLoaderIcon'
import { notify } from '@shared/toast'
import { accessTokenSignal, useLogInMutation, userSlice } from '@entities/user'
import { instance } from '@shared/instance'
import { queryKey } from '@shared/consts/queryKey'
import {
  reLoadQuotationSignal,
  useGetQuotationsQuery,
} from '@entities/quotation'
import { useGetBookmarksQuery } from '@entities/bookmark'
import type { NavigateState } from '@shared/types/NavigateState'
import {
  type Location,
  useLocation,
  useNavigate,
  useParams,
} from 'react-router-dom'
import { dispatch } from '@shared/lib/redux'
import { navSlice } from '@shared/nav'
import { navItemKey } from '@shared/consts/navItemKey'
import { route } from '@shared/consts/route'
import { nanoid } from '@shared/lib/nanoid'
import { slideElement } from '@shared/utils/slideElement'

export const LogInAsUserButton = ({ email }: Payload): React.ReactNode => {
  const navigate = useNavigate()
  const { quotationId } = useParams()

  const {
    mutate: logIn,
    isPending,
    data,
    isSuccess,
    // isError,
    // error,
  } = useLogInMutation()

  const location = useLocation() as Location<NavigateState>
  const { refetch: refetchQuotations } = useGetQuotationsQuery()
  const { refetch: refetchBookmarks } = useGetBookmarksQuery()

  useUpdateEffect(() => {
    if (isSuccess) {
      // const { message } = data

      if (!data.accessJwtToken) {
        return
      }

      if (!data.email) {
        return
      }

      accessTokenSignal.value = data.accessJwtToken

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
        reLoadQuotationSignal.value = nanoid(5)
      }
    }
  }, [isSuccess])

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
