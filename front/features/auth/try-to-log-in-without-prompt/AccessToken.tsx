import type { JwtPayloadExtended } from '@back/shared/lib/json-webtoken'
import { navItemId } from '@front/entities/nav/navItemId'
import { navSlice } from '@front/entities/nav/navSlice'
import { createLoadingMenuIconMachine } from '@front/entities/nav/state-machine/createLoadingMenuIconMachine'
import { useGetUserAccessTokenQuery } from '@front/entities/user/api/useGetUserAccessTokenQuery'
import { userSlice } from '@front/entities/user/redux/userSlice'
import { agGridSlice } from '@front/shared/lib/ag-grid/agGridSlice'
import { reduxHolder } from '@front/shared/lib/redux'
import { jwtDecode } from 'jwt-decode'
import { useEffectOnce, useUpdateEffect } from 'react-use'
import { createActor } from 'xstate'

if (typeof Promise.withResolvers !== 'function') {
  const element = document.querySelector('.wait-for-init-files-to-load')

  if (element instanceof HTMLElement) {
    element.textContent = 'Your browser is too old, please update :('
  }

  throw new Error('old browser, please update')
}

export const getAccessTokenDeferred = Promise.withResolvers<
  'fetched' | 'failed'
>()

const loadingMenuIconMachine = createLoadingMenuIconMachine({
  navItemId: navItemId.login,
})

const loadingIconActor = createActor(loadingMenuIconMachine).start()

export const AccessToken = (): React.ReactNode => {
  const getUserAccessTokenQuery = useGetUserAccessTokenQuery()

  // get initial access token on app load
  useEffectOnce(() => {
    if (reduxHolder.getState().user.accessToken === null) {
      void getUserAccessTokenQuery.refetch()
    }
  })

  // show jumping dots at table
  useUpdateEffect(() => {
    if (getUserAccessTokenQuery.isFetching === true) {
      loadingIconActor.send({ type: 'show loading icon' })

      reduxHolder.dispatch(
        agGridSlice.actions.showLoadingOverlay({
          showLoader: true,
          text: 'Checking credentials',
        }),
      )
    }
  }, [getUserAccessTokenQuery.isFetching])

  useUpdateEffect(() => {
    if (getUserAccessTokenQuery.isSuccess === true) {
      const jwtPayload = jwtDecode<JwtPayloadExtended>(
        getUserAccessTokenQuery.data.accessJwtToken,
      )

      reduxHolder.dispatch(
        userSlice.actions.setAccessToken({
          accessToken: getUserAccessTokenQuery.data.accessJwtToken,
        }),
      )

      reduxHolder.dispatch(
        agGridSlice.actions.showLoadingOverlay({
          showLoader: false,
          text: 'Logged in',
        }),
      )

      reduxHolder.dispatch(
        userSlice.actions.rememberLoggedUser({
          email: jwtPayload.email,
          roles: getUserAccessTokenQuery.data.roles,
        }),
      )

      reduxHolder.dispatch(
        navSlice.actions.hideNavItems({ navItemIds: [navItemId.login] }),
      )

      reduxHolder.dispatch(
        navSlice.actions.showNavItems({
          navItemIds: [navItemId.profile],
        }),
      )

      const isSuperAdmin = jwtPayload.roles.includes('super-admin')

      if (isSuperAdmin === true) {
        reduxHolder.dispatch(
          navSlice.actions.showNavItems({ navItemIds: ['admin'] }),
        )

        reduxHolder.dispatch(navSlice.actions.showAdminIcon())
      } else {
        reduxHolder.dispatch(
          navSlice.actions.hideNavItems({ navItemIds: ['admin'] }),
        )

        reduxHolder.dispatch(navSlice.actions.showUserIcon())
      }

      reduxHolder.dispatch(
        navSlice.actions.stopLoadingIcon({
          navItemId: navItemId.login,
        }),
      )

      loadingIconActor.send({ type: 'show success icon' })
      getAccessTokenDeferred.resolve('fetched')
    }
  }, [getUserAccessTokenQuery.isSuccess])

  useUpdateEffect(() => {
    if (getUserAccessTokenQuery.isError === true) {
      reduxHolder.dispatch(
        agGridSlice.actions.showLoadingOverlay({
          showLoader: false,
          text: 'Not logged in',
        }),
      )

      reduxHolder.dispatch(userSlice.actions.forgetLoggedUser())

      reduxHolder.dispatch(
        navSlice.actions.showNavItems({ navItemIds: [navItemId.login] }),
      )

      reduxHolder.dispatch(
        navSlice.actions.hideNavItems({
          navItemIds: [navItemId.profile],
        }),
      )

      reduxHolder.dispatch(
        navSlice.actions.stopLoadingIcon({
          navItemId: navItemId.login,
        }),
      )

      // loadingIconActor.send({ type: 'show error icon' })
      getAccessTokenDeferred.resolve('failed')
    }
  }, [getUserAccessTokenQuery.isError])

  return null
}
