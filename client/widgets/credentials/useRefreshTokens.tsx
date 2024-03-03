import { dispatch } from '@lib_instances/store'
import axios from 'axios'
import { jwtDecode } from 'jwt-decode'
import { useState } from 'react'
import { useEffectOnce } from 'react-use'
import type { ResBody } from 'server/api/refreshRouter'
import { apiUrl } from 'server/consts/apiUrl'
import type { JwtPayloadExtended } from 'server/services/jwt'
import { navUpdate } from '@features/log_out'
import { userSlice, accessTokenRef } from '@entities/user'
import { tokenExpirationMinutes } from './tokenExpirationMinutes'

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

export const useRefreshTokens = ({ withLoadingState }: Props): Res => {
  const [isCheckingTokens, setIsCheckingTokens] = useState(true)

  const refreshTokens = async (): Promise<void> => {
    try {
      if (accessTokenRef.current === null) {
        const response = await axios.get<ResBody>(apiUrl.refresh, { withCredentials: true })

        if (response.status === 401) {
          accessTokenRef.current = null
          dispatch(userSlice.actions.forgetLoggedUser())
          navUpdate.logout()
          console.error(response.data.message)
          return
        }

        if (!response.data.accessJwtToken) {
          dispatch(userSlice.actions.forgetLoggedUser())
          navUpdate.logout()
          console.warn('no access token in db')
          return
        }

        const payloadFromUpdatedAccessToken = jwtDecode<JwtPayloadExtended>(response.data.accessJwtToken)
        const { email } = payloadFromUpdatedAccessToken

        if (!email) {
          dispatch(userSlice.actions.forgetLoggedUser())
          navUpdate.logout()
          console.warn('token is invalid')
          return
        }

        if (email) {
          accessTokenRef.current = response.data.accessJwtToken
          dispatch(userSlice.actions.rememberLoggedUser({ email, isLogged: true, roles: response.data.roles }))
          navUpdate.login()
          console.info(`tokens for ${email} are refreshed`)
        }

        return
      }

      if (accessTokenRef.current !== null) {
        const expirationInMin = tokenExpirationMinutes(accessTokenRef.current)

        if (expirationInMin > 5) {
          const payloadFromExistingAccessToken = jwtDecode<JwtPayloadExtended>(accessTokenRef.current)
          const { email, roles } = payloadFromExistingAccessToken
          dispatch(userSlice.actions.rememberLoggedUser({ email, isLogged: true, roles }))
          navUpdate.login()
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
    void refreshTokens()
  })

  return { isCheckingTokens }
}
