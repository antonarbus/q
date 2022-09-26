// eslint-disable-next-line camelcase
import jwt_decode from 'jwt-decode'
import { store } from '@src/store'
import { credentialsSlice } from './credentialsSlice'
import axios from 'axios'

export async function refreshTokens() {
  try {
    const existingAccessJwtToken = localStorage.getItem('accessJwtToken')
    if (!existingAccessJwtToken) {
      return console.log('user is not logged in')
    }

    // check when access token expires
    const exp = (JSON.parse(window.atob(existingAccessJwtToken.split('.')[1]))).exp // in seconds since 01 January 1970 GMT
    const d = new Date('1970-01-01T00:00:00Z') // Thu Jan 01 1970 02:00:00 GMT+0200 (Eastern European Standard Time)
    const expiration = d.setUTCSeconds(exp) // 1663584953000 //the value of 'exp', note use UTC not setSeconds().
    const now = new Date().valueOf()
    const difference = expiration - now
    const oneMin = 1 * 60 * 1000
    const expirationInMin = difference / oneMin

    if (expirationInMin > 5) {
      return console.log(`access token expires in ${expirationInMin} min, which is more than 5 min, so let's skip the refresh for now`)
    }

    const response = await axios.get('/api/refresh', { withCredentials: true })
    const { status, accessJwtToken, roles } = response.data

    if (status === 'error') {
      localStorage.removeItem('accessJwtToken')
      store.dispatch(credentialsSlice.actions.forgetLoggedUser())
      return console.log(response.data.message)
    }

    if (!accessJwtToken) {
      store.dispatch(credentialsSlice.actions.forgetLoggedUser())
      return console.log('no access token in db')
    }

    const jwtTokenPayload: {email: string | undefined} = jwt_decode(accessJwtToken)
    const { email } = jwtTokenPayload
    if (!email) {
      store.dispatch(credentialsSlice.actions.forgetLoggedUser())
      return console.log('token is invalid')
    }

    if (email) {
      localStorage.setItem('accessJwtToken', accessJwtToken)
      console.log(response)
      store.dispatch(credentialsSlice.actions.rememberLoggedUser({ email, isLogged: true, roles }))
      return console.log(`tokens for ${email} are refreshed`)
    }
  } catch (error) {
    console.log(error)
  }
}
