import { dispatch } from '@lib_instances/store'
import type { ResBody } from '@server/api/getAccessTokenRouter'
import axios from 'axios'
import { jwtDecode } from 'jwt-decode'
import type { JwtPayload } from 'jwt-decode'
import { useState } from 'react'
import { useEffectOnce } from 'react-use'
import { apiUrl } from 'server/consts/apiUrl'
import type { JwtPayloadExtended } from 'server/services/jwt'
import { userSlice } from '@entities/user'
import { accessTokenSignal } from '@shared/auth/accessTokenSignal'
import { navSlice } from '@shared/nav'

type Props = {
  withLoadingState?: boolean
}

/**
 * refresh tokens hook
 * @param {boolean} withLoadingState at the app loading we want to refresh tokens,
 * but do not want to track it and re-render app, but at the pages with authentication we show spinner during credentials check
 */

// useRefreshTokens is used in <PersistentAuth /> and in <Main />
// there is no race condition coz components are parallel and useRefreshTokens is fired only ones
// if we put useRefreshTokens in <App /> instead of <Main /> then it will be fired twice almost at the same time and
// token refresh will invalidate existing token

// we probably may poll periodically /api/refresh and in case user is deleted he will automatically logged out
// but no need to do, because all protected apis calls will do the same
// he may stay logged in forever without making any harm

type Res = {
  isCheckingTokens: boolean
}

export const useGetAccessToken = ({ withLoadingState }: Props): Res => {
  const [isCheckingTokens, setIsCheckingTokens] = useState(true)

  const getAccessToken = async (): Promise<void> => {
    try {
      if (accessTokenSignal.value === null) {
        const response = await axios.get<ResBody>(apiUrl.getAccessToken, { withCredentials: true })

        if (response.status === 401) {
          dispatch(userSlice.actions.forgetLoggedUser())
          dispatch(navSlice.actions.showLogInMenuItem())
          dispatch(navSlice.actions.hideAccountMenuItem())
          console.error(response.data.message)
          return
        }

        if (!response.data.accessJwtToken) {
          dispatch(userSlice.actions.forgetLoggedUser())
          dispatch(navSlice.actions.showLogInMenuItem())
          dispatch(navSlice.actions.hideAccountMenuItem())
          console.warn('no access token issued')
          return
        }

        const payloadFromAccessToken = jwtDecode<JwtPayloadExtended>(response.data.accessJwtToken)
        const { email } = payloadFromAccessToken

        if (!email) {
          dispatch(userSlice.actions.forgetLoggedUser())
          dispatch(navSlice.actions.showLogInMenuItem())
          dispatch(navSlice.actions.hideAccountMenuItem())
          console.warn('token is invalid')
          return
        }

        if (email) {
          accessTokenSignal.value = response.data.accessJwtToken
          dispatch(userSlice.actions.rememberLoggedUser({ email, roles: response.data.roles }))
          dispatch(navSlice.actions.hideLogInMenuItem())
          dispatch(navSlice.actions.showAccountMenuItem())
          console.info(`access token was issued for ${email}`)
        }

        return
      }

      if (accessTokenSignal.value !== null) {
        const expirationInMin = tokenExpirationMinutes(accessTokenSignal.value)

        if (expirationInMin > 5) {
          const payloadFromExistingAccessToken = jwtDecode<JwtPayloadExtended>(accessTokenSignal.value)
          const { email, roles } = payloadFromExistingAccessToken
          dispatch(userSlice.actions.rememberLoggedUser({ email, roles }))
          dispatch(navSlice.actions.hideLogInMenuItem())
          dispatch(navSlice.actions.showAccountMenuItem())
          console.warn(`access token expires in ${expirationInMin.toFixed(2)} min, which is more than 5 min, skip the refresh for now`)
        }
      }
    } catch (error) {
      console.error(error)
    } finally {
      if (withLoadingState) {
        setIsCheckingTokens(false)
      }
    }
  }

  useEffectOnce(() => {
    void getAccessToken()
  })

  return { isCheckingTokens }
}

export function tokenExpirationMinutes(token: string): number {
  const jwtPayloadHashed = token.split('.')[1]
  if (!jwtPayloadHashed) return 0
  const jwtPayloadDecodedIntoJson = window.atob(jwtPayloadHashed) // atob() decodes Base64 decoded string
  const jwtPayload = JSON.parse(jwtPayloadDecodedIntoJson) as JwtPayload
  const { exp } = jwtPayload // in seconds since 01.01.1970 GMT
  if (!exp) return 0
  const d = new Date('1970-01-01T00:00:00Z') // Thu Jan 01 1970 02:00:00 GMT+0200 (Eastern European Standard Time)
  const expiration = d.setUTCSeconds(exp) // 1663584953000 //the value of 'exp', note use UTC not setSeconds().
  const now = new Date().valueOf()
  const difference = expiration - now
  const oneMin = 1 * 60 * 1000
  const expirationInMin = difference / oneMin
  return expirationInMin
}
