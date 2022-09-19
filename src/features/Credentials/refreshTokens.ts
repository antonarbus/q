// eslint-disable-next-line camelcase
import jwt_decode from 'jwt-decode'
import { store } from '@src/store'
import { rememberLoggedUser } from './credentialsSlice'
import axios from 'axios'

export async function refreshTokens() {
  try {
    const existingAccessJwtToken = localStorage.getItem('accessJwtToken')
    if (!existingAccessJwtToken) return console.log('user is not logged in')

    const exp = (JSON.parse(atob(existingAccessJwtToken.split('.')[1]))).exp // in seconds since 01 January 1970 GMT
    const d = new Date('1970-01-01T00:00:00Z') // Thu Jan 01 1970 02:00:00 GMT+0200 (Eastern European Standard Time)
    const expiration = d.setUTCSeconds(exp) // 1663584953000 //the value of 'exp', note use UTC not setSeconds().
    const now = new Date().valueOf()
    const difference = expiration - now
    const oneMin = 1 * 60 * 1000
    const expirationInMin = Math.abs(difference / oneMin)
    if (expirationInMin > 5) return console.log('access token expires in more than 5 min, skip the refresh for now')

    const response = await axios.get('/api/refresh', { withCredentials: true })
    const status = response.data.status
    if (status === 'error') {
      console.log(response.data.message)
      localStorage.removeItem('accessJwtToken')
    }
    const accessJwtToken = response.data.accessJwtToken
    if (!accessJwtToken) return console.log('no access token in db')
    const jwtTokenPayload: {email: string | undefined} = jwt_decode(accessJwtToken)
    const { email } = jwtTokenPayload
    if (!email) return console.log('token is invalid')
    localStorage.setItem('accessJwtToken', accessJwtToken)
    console.log(response)
    store.dispatch(rememberLoggedUser({ email, isLogged: true, role: 'viewer' }))
    console.log(`tokens for ${email} are refreshed`)
  } catch (error) {
    console.log(error)
  }
}
