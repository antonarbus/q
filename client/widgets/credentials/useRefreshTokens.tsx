import { store } from 'client/app/store'
import { useState } from 'react'
import { useEffectOnce } from 'react-use'
import jwt_decode from 'jwt-decode'
import axios from 'axios'
import { tokenExpirationMinutes } from './tokenExpirationMinutes'
import { navUpdate } from './navUpdate'
import { token } from '../../shared/auth/token'
import { forgetLoggedUser, rememberLoggedUser } from 'client/entities/user'
import type { TJwtPayload } from 'server/services/jwt'
import type { TRefreshAipRes } from 'server/api/refreshRouter'
import { apiUrl } from 'server/apiUrls'

interface Props {
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
// toke refresh will invalidate existing token

// we probably may poll periodically /api/refresh and in case user is deleted he will automatically logged out
// but no need to do, because all protected apis calls will do the same
// he may stay logged in forever without making any harm

interface TRes {
  isCheckingTokens: boolean;
}

export const useRefreshTokens = ({ withLoadingState }: Props): TRes => {
  const [isCheckingTokens, setIsCheckingTokens] = useState(true)

  useEffectOnce(() => {
    const refreshTokens = async (): Promise<void> => {
      try {
        if (token.access) {
          const expirationInMin = tokenExpirationMinutes(token.access)
          if (expirationInMin > 5) {
            const payloadFromExistingAccessToken = jwt_decode<TJwtPayload>(token.access)
            const { email, roles } = payloadFromExistingAccessToken
            store.dispatch(rememberLoggedUser({ email, isLogged: true, roles }))
            navUpdate.login()
            console.log(`access token expires in ${expirationInMin.toFixed(2)} min, which is more than 5 min, skip the refresh for now`)
            return
          }
        }

        const response = await axios.get<TRefreshAipRes>(apiUrl.refresh, {
          withCredentials: true,
        })
        const { status, accessJwtToken, roles } = response.data

        if (status === 'error') {
          token.access = ''
          store.dispatch(forgetLoggedUser())
          navUpdate.logout()
          console.log(response.data.message)
          return
        }

        if (!accessJwtToken) {
          store.dispatch(forgetLoggedUser())
          navUpdate.logout()
          console.log('no access token in db')
          return
        }

        const payloadFromUpdatedAccessToken = jwt_decode<TJwtPayload>(accessJwtToken)
        const { email } = payloadFromUpdatedAccessToken
        if (!email) {
          store.dispatch(forgetLoggedUser())
          navUpdate.logout()
          console.log('token is invalid')
          return
        }

        if (email) {
          token.access = accessJwtToken
          // console.log(response)
          store.dispatch(rememberLoggedUser({ email, isLogged: true, roles }))
          navUpdate.login()
          console.log(`tokens for ${email} are refreshed`)
          return
        }
      } catch (error) {
        console.log(error)
      } finally {
        if (withLoadingState) {
          setIsCheckingTokens(false)
        }
      }
    }

    void refreshTokens()
  })

  return { isCheckingTokens }
}
