import type { JwtPayloadExtended } from '@back/utils/jwt'
import { dispatch } from '@shared/lib/redux'
import { jwtDecode } from 'jwt-decode'
import { useEffectOnce, useUpdateEffect } from 'react-use'
import {
  useGetAccessTokenQuery,
  userSlice,
  accessTokenSignal,
} from '@entities/user'
import { loadingTableOverlaySignal } from '@shared/components/LoadingTableOverlay'
import { navItemKey } from '@shared/consts/navItemKey'
import { navSlice, showLoadingNavIcon } from '@shared/nav'

export const {
  promise: initAccessTokenFetchingPromise,
  resolve: resolveInitAccessTokenFetching,
} = Promise.withResolvers<'fetched' | 'failed'>()

export const AccessToken = (): React.JSX.Element => {
  const {
    data,
    refetch: getAccessToken,
    isFetching,
    isError,
    isSuccess,
  } = useGetAccessTokenQuery()

  // get initial access token on app load
  useEffectOnce(() => {
    if (accessTokenSignal.value === null) {
      void getAccessToken()
    }
  })

  // show jumping dots at table
  useUpdateEffect(() => {
    if (isFetching) {
      showLoadingNavIcon({ navMenuItemIdKey: navItemKey.login })

      loadingTableOverlaySignal.value = {
        areJumpingDotsShown: true,
        text: 'Checking credentials',
      }
    }
  }, [isFetching])

  useUpdateEffect(() => {
    if (isSuccess) {
      if (!data.accessJwtToken) {
        return
      }

      const jwtPayload = jwtDecode<JwtPayloadExtended>(data.accessJwtToken)

      const { email, roles } = jwtPayload

      if (!email) {
        return
      }

      accessTokenSignal.value = data.accessJwtToken

      loadingTableOverlaySignal.value = {
        areJumpingDotsShown: false,
        text: 'Logged in',
      }

      dispatch(
        userSlice.actions.rememberLoggedUser({
          email,
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

      if (roles.includes('super-admin')) {
        dispatch(navSlice.actions.showNavItems({ navItemIdKeys: ['admin'] }))
      } else {
        dispatch(navSlice.actions.hideNavItems({ navItemIdKeys: ['admin'] }))
      }

      dispatch(
        navSlice.actions.stopLoadingIcon({
          navMenuItemIdKey: navItemKey.login,
        }),
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
        navSlice.actions.showNavItems({ navItemIdKeys: [navItemKey.login] }),
      )

      dispatch(
        navSlice.actions.hideNavItems({
          navItemIdKeys: [navItemKey.profile],
        }),
      )

      dispatch(
        navSlice.actions.stopLoadingIcon({
          navMenuItemIdKey: navItemKey.login,
        }),
      )

      resolveInitAccessTokenFetching('failed')
    }
  }, [isError])

  return <></>
}
