import { LoadingFullPage } from '@src/common_components/LoadingFullPage'
import { store, useSelectorTyped } from '@src/store'
import { useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom'
import { useEffectOnce } from 'react-use'
import { useRefreshTokens } from './useRefreshTokens'
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

export const PersistentAuth = () => {
  const [isLoading, setIsLoading] = useState(true)
  const isLogged = useSelectorTyped(state => state.credentials.isLogged)

  useEffect(() => {
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
          // localStorage.removeItem('accessJwtToken')
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
          // localStorage.setItem('accessJwtToken', accessJwtToken)
          globalObject.accessJwtToken = accessJwtToken
          console.log(response)
          rememberLoggedUser({ email, roles })
          navUpdate.login()
          return console.log(`tokens for ${email} are refreshed`)
        }
      } catch (error) {
        console.log(error)
      } finally {
        setIsLoading(false)
      }
    }

    !isLogged
      ? refreshTokens()
      : setIsLoading(false)
  }, [isLogged])

  return (
    <>
      {
        isLoading
          ? <LoadingFullPage />
          : <Outlet />
      }
    </>
  )
}
