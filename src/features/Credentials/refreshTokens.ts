// eslint-disable-next-line camelcase
import jwt_decode from 'jwt-decode'
import { store } from '@src/store'
import { credentialsSlice } from './credentialsSlice'
import axios from 'axios'
import { jwtTokenExpirationDays } from './jwtTokenExpirationDays'
import { jwtAccessTokenType } from '@src/types'
import { navUpdate } from './navUpdate'
const forgetLoggedUser = () => store.dispatch(credentialsSlice.actions.forgetLoggedUser())
const rememberLoggedUser = ({ email, roles }: jwtAccessTokenType) => store.dispatch(credentialsSlice.actions.rememberLoggedUser({ email, isLogged: true, roles }))

export async function refreshTokens() {
  try {
    const existingAccessJwtToken = localStorage.getItem('accessJwtToken')
    if (!existingAccessJwtToken) {
      forgetLoggedUser()
      navUpdate.logout()
      return console.log('user is not logged in')
    }

    const expirationInMin = jwtTokenExpirationDays(existingAccessJwtToken)
    if (expirationInMin > 5) {
      const payloadFromExistingAccessToken: jwtAccessTokenType = jwt_decode(existingAccessJwtToken)
      const { email, roles } = payloadFromExistingAccessToken
      rememberLoggedUser({ email, roles })
      navUpdate.login()
      return console.log(`access token expires in ${expirationInMin.toFixed(2)} min, which is more than 5 min, so let's skip the refresh for now`)
    }

    const response = await axios.get('/api/refresh', { withCredentials: true })
    const { status, accessJwtToken, roles } = response.data

    if (status === 'error') {
      localStorage.removeItem('accessJwtToken')
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
      localStorage.setItem('accessJwtToken', accessJwtToken)
      console.log(response)
      rememberLoggedUser({ email, roles })
      navUpdate.login()
      return console.log(`tokens for ${email} are refreshed`)
    }
  } catch (error) {
    console.log(error)
  }
}
