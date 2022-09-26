// eslint-disable-next-line camelcase
import jwt_decode from 'jwt-decode'
import { store } from '@src/store'
import { credentialsSlice } from './credentialsSlice'
import axios from 'axios'
import { jwtTokenExpirationDays } from './jwtTokenExpirationDays'
import { jwtAccessTokenType } from '@src/types'

export async function refreshTokens() {
  const logoutFromRedux = () => store.dispatch(credentialsSlice.actions.forgetLoggedUser())
  const logIntoRedux = ({ email, roles }: jwtAccessTokenType) => store.dispatch(credentialsSlice.actions.rememberLoggedUser({ email, isLogged: true, roles }))

  try {
    const existingAccessJwtToken = localStorage.getItem('accessJwtToken')
    if (!existingAccessJwtToken) {
      return console.log('user is not logged in')
    }

    const expirationInMin = jwtTokenExpirationDays(existingAccessJwtToken)
    if (expirationInMin > 5) {
      const payloadFromExistingAccessToken: jwtAccessTokenType = jwt_decode(existingAccessJwtToken)
      const { email, roles } = payloadFromExistingAccessToken
      logIntoRedux({ email, roles })
      return console.log(`access token expires in ${expirationInMin} min, which is more than 5 min, so let's skip the refresh for now`)
    }

    const response = await axios.get('/api/refresh', { withCredentials: true })
    const { status, accessJwtToken, roles } = response.data

    if (status === 'error') {
      localStorage.removeItem('accessJwtToken')
      logoutFromRedux()
      return console.log(response.data.message)
    }

    if (!accessJwtToken) {
      logoutFromRedux()
      return console.log('no access token in db')
    }

    const payloadFromUpdatedAccessToken: jwtAccessTokenType = jwt_decode(accessJwtToken)
    const { email } = payloadFromUpdatedAccessToken
    if (!email) {
      logoutFromRedux()
      return console.log('token is invalid')
    }

    if (email) {
      localStorage.setItem('accessJwtToken', accessJwtToken)
      console.log(response)
      logIntoRedux({ email, roles })
      return console.log(`tokens for ${email} are refreshed`)
    }
  } catch (error) {
    console.log(error)
  }
}
