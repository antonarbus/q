import { store } from '@src/store'
import { useState } from 'react'
import { useEffectOnce } from 'react-use'
// eslint-disable-next-line camelcase
import jwt_decode from 'jwt-decode'
import { credentialsSlice } from './credentialsSlice'
import axios from 'axios'
import { jwtTokenExpirationDays } from './jwtTokenExpirationDays'
import { jwtAccessTokenType } from '@src/types'
import { navUpdate } from './navUpdate'
import { globalObject } from '@src/globalObject'
const forgetLoggedUser = () => store.dispatch(credentialsSlice.actions.forgetLoggedUser())
const rememberLoggedUser = ({ email, roles }: jwtAccessTokenType) => store.dispatch(credentialsSlice.actions.rememberLoggedUser({ email, isLogged: true, roles }))

export const useRefreshTokens = () => {
  // todo: used during the app loading + at PersistentAuth
  // todo: at Persistent auth it re-renders due to below state change
  // todo: but at app loading do not need to do that
  // todo: probably need to separate logic

  const [isCheckingTokens, setIsCheckingTokens] = useState(true)

  useEffectOnce(() => {
    async function refreshTokens() {
      try {
        const existingAccessJwtToken = globalObject.accessJwtToken
        if (existingAccessJwtToken) {
          const expirationInMin = jwtTokenExpirationDays(existingAccessJwtToken)
          if (expirationInMin > 5) {
            const payloadFromExistingAccessToken: jwtAccessTokenType = jwt_decode(existingAccessJwtToken)
            const { email, roles } = payloadFromExistingAccessToken
            rememberLoggedUser({ email, roles })
            navUpdate.login()
            return console.log(`access token expires in ${expirationInMin.toFixed(2)} min, which is more than 5 min, so let's skip the refresh for now`)
          }
        }

        const response = await axios.get('/api/refresh', { withCredentials: true })
        const { status, accessJwtToken, roles } = response.data

        if (status === 'error') {
          globalObject.accessJwtToken = ''
          forgetLoggedUser()
          navUpdate.logout()
          return console.log(response.data.message)
        }

        if (!accessJwtToken) {
          forgetLoggedUser()
          navUpdate.logout()
          return console.log('no access token in db')
        }

        const payloadFromUpdatedAccessToken: jwtAccessTokenType = jwt_decode(accessJwtToken)
        const { email } = payloadFromUpdatedAccessToken
        if (!email) {
          forgetLoggedUser()
          navUpdate.logout()
          return console.log('token is invalid')
        }

        if (email) {
          globalObject.accessJwtToken = accessJwtToken
          console.log(response)
          rememberLoggedUser({ email, roles })
          navUpdate.login()
          return console.log(`tokens for ${email} are refreshed`)
        }
      } catch (error) {
        console.log(error)
      } finally {
        setIsCheckingTokens(false)
      }
    }

    refreshTokens()
  })

  return { isCheckingTokens }
}
