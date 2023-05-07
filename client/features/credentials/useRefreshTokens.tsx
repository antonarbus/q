import { store } from 'client/store'
import { useState } from 'react'
import { useEffectOnce } from 'react-use'
// eslint-disable-next-line camelcase
import jwt_decode from 'jwt-decode'
import axios from 'axios'
import { tokenExpirationMinutes } from './tokenExpirationMinutes'
import { navUpdate } from './navUpdate'
import { forgetLoggedUser, rememberLoggedUser } from './credentialsSlice'
import { token } from './token'

type JwtAccessTokenType = { email: string, roles: string[] }

type TProps = {
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

export const useRefreshTokens = ({ withLoadingState }: TProps) => {
  const [isCheckingTokens, setIsCheckingTokens] = useState(true)

  useEffectOnce(() => {
    async function refreshTokens() {
      try {
        if (token.access) {
          const expirationInMin = tokenExpirationMinutes(token.access)
          if (expirationInMin > 5) {
            const payloadFromExistingAccessToken: JwtAccessTokenType = jwt_decode(token.access)
            const { email, roles } = payloadFromExistingAccessToken
            store.dispatch(rememberLoggedUser({ email, isLogged: true, roles }))
            navUpdate.login()
            return console.log(`access token expires in ${expirationInMin.toFixed(2)} min, which is more than 5 min, skip the refresh for now`)
          }
        }

        const response = await axios.get('/api/refresh', { withCredentials: true })
        const { status, accessJwtToken, roles } = response.data

        if (status === 'error') {
          token.access = ''
          store.dispatch(forgetLoggedUser())
          navUpdate.logout()
          return console.log(response.data.message)
        }

        if (!accessJwtToken) {
          store.dispatch(forgetLoggedUser())
          navUpdate.logout()
          return console.log('no access token in db')
        }

        const payloadFromUpdatedAccessToken: JwtAccessTokenType = jwt_decode(accessJwtToken)
        const { email } = payloadFromUpdatedAccessToken
        if (!email) {
          store.dispatch(forgetLoggedUser())
          navUpdate.logout()
          return console.log('token is invalid')
        }

        if (email) {
          token.access = accessJwtToken
          // console.log(response)
          store.dispatch(rememberLoggedUser({ email, isLogged: true, roles }))
          navUpdate.login()
          return console.log(`tokens for ${email} are refreshed`)
        }
      } catch (error) {
        console.log(error)
      } finally {
        withLoadingState && setIsCheckingTokens(false)
      }
    }

    refreshTokens()
  })

  return { isCheckingTokens }
}
