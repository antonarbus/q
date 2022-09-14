import { Outlet } from 'react-router-dom'
// eslint-disable-next-line camelcase
import jwt_decode from 'jwt-decode'
import axios from 'axios'
import { useEffectOnce } from 'react-use'
import { store } from '@redux/store'
import { login } from '@redux/slices/userSlice'
import { Dummy } from './Dummy'

export function Main() {
  useEffectOnce(() => {
    async function refreshTokens() {
      // todo: move function into 'functions' folder in a file of folder with credentials business logic
      // todo: separate helper files by a business logic
      try {
        if (!localStorage.getItem('accessJwtToken')) return console.log('user is not logged in')
        const response = await axios.get('/api/refresh', { withCredentials: true })
        const status = response.data.status
        if (status === 'error') {
          console.log(response.data.message)
          localStorage.removeItem('accessJwtToken')
        }
        const accessJwtToken = response.data.accessJwtToken
        if (!accessJwtToken) return console.log('not access token in db')
        const jwtTokenPayload: {email: string | undefined} = jwt_decode(accessJwtToken)
        const { email } = jwtTokenPayload
        if (!email) return console.log('token is not valid')
        localStorage.setItem('accessJwtToken', accessJwtToken)
        console.log(response)
        store.dispatch(login({ email, isLogged: true, role: 'viewer' }))
        console.log(`tokens for ${email} are refreshed`)
      } catch (error) {
        console.log(error)
      }
    }
    refreshTokens()
  })

  return (
    <main css={{ margin: '10px' }}>
      <Outlet />
      <Dummy />
    </main>
  )
}
