import type { JwtPayloadExtended } from '@back/shared/lib/jwt'
import { dispatch, getState } from '@shared/lib/redux'
import { jwtDecode } from 'jwt-decode'
import { useEffectOnce, useUpdateEffect } from 'react-use'
import { useGetAccessTokenQuery, userRole, userSlice } from '@entities/user'
import { navItemKey } from '@shared/consts/navItemKey'
import { navSlice, showLoadingNavIcon } from '@shared/nav'
import { agGridSlice } from '@shared/lib/ag_grid/agGridSlice'

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
    const accessToken = getState().user.accessToken

    if (accessToken === null) {
      void getAccessToken()
    }
  })

  // show jumping dots at table
  useUpdateEffect(() => {
    if (isFetching) {
      showLoadingNavIcon({ navMenuItemIdKey: navItemKey.login })

      dispatch(
        agGridSlice.actions.showLoadingOverlay({
          showLoader: true,
          text: 'Checking credentials',
        }),
      )
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

      dispatch(
        userSlice.actions.setAccessToken({
          accessToken: data.accessJwtToken,
        }),
      )

      dispatch(
        agGridSlice.actions.showLoadingOverlay({
          showLoader: false,
          text: 'Logged in',
        }),
      )

      dispatch(
        userSlice.actions.rememberLoggedUser({
          email,
          roles: data.roles ?? [userRole.user],
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

      if (roles.includes(userRole.superAdmin)) {
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
      dispatch(
        agGridSlice.actions.showLoadingOverlay({
          showLoader: false,
          text: 'Not logged in',
        }),
      )

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
