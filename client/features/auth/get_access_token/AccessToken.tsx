import { dispatch } from '@lib_instances/store'
import { jwtDecode } from 'jwt-decode'
import { useEffectOnce, useUpdateEffect } from 'react-use'
import type { JwtPayloadExtended } from 'server/services/jwt'
import { useGetAccessTokenQuery, userSlice } from '@entities/user'
import { accessTokenSignal } from '@shared/auth/accessTokenSignal'
import { loadingTableOverlaySignal } from '@shared/components/LoadingTableOverlay'
import { navItemKey } from '@shared/consts/navItemKey'
import { resolveInitAccessTokenFetching } from '@shared/lib/axios/axiosWithAuth'
import { navSlice } from '@shared/nav'

export const AccessToken = (): JSX.Element => {
  const {
    data,
    refetch: getAccessToken,
    isFetching,
    isError,
    isSuccess,
  } = useGetAccessTokenQuery()

  useEffectOnce(function getInitialAccessTokenOnAppLoad() {
    if (accessTokenSignal.value === null) {
      void getAccessToken()
    }
  })

  useUpdateEffect(
    function showJumpingDotsAtTable() {
      if (isFetching) {
        loadingTableOverlaySignal.value = {
          areJumpingDotsShown: true,
          text: 'Checking credentials',
        }
      }
    },
    [isFetching],
  )

  useUpdateEffect(
    function handleSuccess() {
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
          navSlice.actions.hideNavItems({ navItemIdKeys: [navItemKey.login] }),
        )

        dispatch(
          navSlice.actions.showNavItems({
            navItemIdKeys: [navItemKey.profile],
          }),
        )

        resolveInitAccessTokenFetching('fetched')
      }
    },
    [isSuccess],
  )

  useUpdateEffect(
    function handleError() {
      if (isError) {
        loadingTableOverlaySignal.value = {
          areJumpingDotsShown: false,
          text: 'Not logged in',
        }

        dispatch(userSlice.actions.forgetLoggedUser())

        dispatch(
          navSlice.actions.showNavItems({ navItemIdKeys: [navItemKey.login] }),
        )

        dispatch(
          navSlice.actions.hideNavItems({
            navItemIdKeys: [navItemKey.profile],
          }),
        )

        resolveInitAccessTokenFetching('failed')
      }
    },
    [isError],
  )

  return <></>
}
