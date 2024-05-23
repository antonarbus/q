import { dispatch } from '@lib_instances/store'
import { jwtDecode } from 'jwt-decode'
import { useEffectOnce, useUpdateEffect } from 'react-use'
import type { JwtPayloadExtended } from 'server/services/jwt'
import { useGetAccessTokenQuery, userSlice } from '@entities/user'
import { accessTokenSignal } from '@shared/auth/accessTokenSignal'
import { loadingTableOverlaySignal } from '@shared/components/LoadingTableOverlay'
import { navItemId } from '@shared/consts/navItemId'
import { resolveInitAccessTokenFetching } from '@shared/lib/axios/axiosWithAuth'
import { navSlice } from '@shared/nav'

export const AccessToken = (): JSX.Element => {
  const { data, refetch, isFetching, isError, isSuccess } =
    useGetAccessTokenQuery()

  useEffectOnce(() => {
    if (accessTokenSignal.value === null) {
      void refetch()
    }
  })

  useUpdateEffect(() => {
    if (isFetching) {
      loadingTableOverlaySignal.value = {
        areJumpingDotsShown: true,
        text: 'Checking credentials',
      }
    }
  }, [isFetching])

  useUpdateEffect(() => {
    if (isSuccess) {
      if (!data.accessJwtToken) return

      const jwtPayload = jwtDecode<JwtPayloadExtended>(data.accessJwtToken)
      const { email } = jwtPayload

      if (!email) return

      accessTokenSignal.value = data.accessJwtToken
      loadingTableOverlaySignal.value = {
        areJumpingDotsShown: false,
        text: 'Logged in',
      }
      dispatch(
        userSlice.actions.rememberLoggedUser({
          email,
          roles: data.roles ?? ['some role'],
        }),
      )
      dispatch(
        navSlice.actions.hideNavItems({ navItemIdKeys: [navItemId.login] }),
      )
      dispatch(
        navSlice.actions.showNavItems({ navItemIdKeys: [navItemId.account] }),
      )
      resolveInitAccessTokenFetching('fetched')
    }
  }, [isSuccess])

  useUpdateEffect(() => {
    if (isError) {
      loadingTableOverlaySignal.value = {
        areJumpingDotsShown: false,
        text: 'Not logged in',
      }
      dispatch(userSlice.actions.forgetLoggedUser())
      dispatch(
        navSlice.actions.showNavItems({ navItemIdKeys: [navItemId.login] }),
      )
      dispatch(
        navSlice.actions.hideNavItems({ navItemIdKeys: [navItemId.account] }),
      )
      resolveInitAccessTokenFetching('failed')
    }
  }, [isError])

  return <></>
}
