import type { JwtPayloadExtended } from '@back/shared/lib/jwt'
import { dispatch, getState } from '@shared/lib/redux'
import { jwtDecode } from 'jwt-decode'
import { useEffectOnce, useUpdateEffect } from 'react-use'
import { useGetAccessTokenQuery, userRole, userSlice } from '@entities/user'
import { navItemId } from '@shared/consts/navItemId'
import { createLoadingMenuIconMachine, navSlice } from '@shared/nav'
import { agGridSlice } from '@shared/lib/ag_grid/agGridSlice'
import { createActor } from 'xstate'

export const {
  promise: initAccessTokenFetchingPromise,
  resolve: resolveInitAccessTokenFetching,
} = Promise.withResolvers<'fetched' | 'failed'>()

const loadingMenuIconMachine = createLoadingMenuIconMachine({
  navItemId: navItemId.login,
})

const loadingIconActor = createActor(loadingMenuIconMachine).start()

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
      loadingIconActor.send({ type: 'show loading icon' })

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

      dispatch(navSlice.actions.hideNavItems({ navItemIds: [navItemId.login] }))

      dispatch(
        navSlice.actions.showNavItems({
          navItemIds: [navItemId.profile],
        }),
      )

      if (roles.includes(userRole.superAdmin)) {
        dispatch(navSlice.actions.showNavItems({ navItemIds: ['admin'] }))
        dispatch(navSlice.actions.showAdminIcon())
      } else {
        dispatch(navSlice.actions.hideNavItems({ navItemIds: ['admin'] }))
        dispatch(navSlice.actions.showUserIcon())
      }

      dispatch(
        navSlice.actions.stopLoadingIcon({
          navItemId: navItemId.login,
        }),
      )

      loadingIconActor.send({ type: 'show success icon' })
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

      dispatch(navSlice.actions.showNavItems({ navItemIds: [navItemId.login] }))

      dispatch(
        navSlice.actions.hideNavItems({
          navItemIds: [navItemId.profile],
        }),
      )

      dispatch(
        navSlice.actions.stopLoadingIcon({
          navItemId: navItemId.login,
        }),
      )

      // loadingIconActor.send({ type: 'show error icon' })
      resolveInitAccessTokenFetching('failed')
    }
  }, [isError])

  return <></>
}
