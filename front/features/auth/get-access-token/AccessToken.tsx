import type { JwtPayloadExtended } from '@back/shared/lib/json-webtoken'
import { dispatch, getState } from '@shared/lib/redux'
import { jwtDecode } from 'jwt-decode'
import { useEffectOnce, useUpdateEffect } from 'react-use'
import { useGetUserAccessTokenQuery, userRole, userSlice } from '@entities/user'
import { navItemId } from '@shared/const/navItemId'
import { createLoadingMenuIconMachine, navSlice } from '@shared/nav'
import { agGridSlice } from '@shared/lib/ag-grid/agGridSlice'
import { createActor } from 'xstate'

if (typeof Promise.withResolvers !== 'function') {
  const element = document.querySelector('.wait-for-init-files-to-load')

  if (element instanceof HTMLElement) {
    element.textContent = 'Your browser is too old, please update :('
  }

  throw new Error('old browser, please update')
}

export const {
  promise: initAccessTokenFetchingPromise,
  resolve: resolveInitAccessTokenFetching,
} = Promise.withResolvers<'fetched' | 'failed'>()

const loadingMenuIconMachine = createLoadingMenuIconMachine({
  navItemId: navItemId.login,
})

const loadingIconActor = createActor(loadingMenuIconMachine).start()

export const AccessToken = (): React.ReactNode => {
  const {
    data,
    refetch: getAccessToken,
    isFetching,
    isError,
    isSuccess,
  } = useGetUserAccessTokenQuery()

  // get initial access token on app load
  useEffectOnce(() => {
    const { accessToken } = getState().user

    if (accessToken === null) {
      void getAccessToken()
    }
  })

  // show jumping dots at table
  useUpdateEffect(() => {
    if (isFetching === true) {
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
    if (isSuccess === true) {
      if (data.accessJwtToken === undefined) {
        return
      }

      const jwtPayload = jwtDecode<JwtPayloadExtended>(data.accessJwtToken)

      const { email, roles } = jwtPayload

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

      const isSuperAdmin = roles.includes(userRole.superAdmin)

      if (isSuperAdmin === true) {
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
    if (isError === true) {
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

  return null
}
