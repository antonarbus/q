import { notify } from '@components/Notifier/notify'
import { Outlet } from 'react-router-dom'
// eslint-disable-next-line camelcase
import jwt_decode from 'jwt-decode'
import axios from 'axios'
import { axiosWithAuth } from '@src/axios/axios'
import { useEffectOnce } from 'react-use'
import { store } from '@redux/store'
import { login } from '@redux/slices/userSlice'

async function getEmailFromDb() {
  try {
    // if we just go in browser to http://localhost:3009/api/user or fetch it with just fetch or axios general instance
    // we get msg "accessJwtToken is not verified, user is not authorized"
    // but with axiosWithAuth we add access token to the header and check it in the middleware 'verifyToken '
    const res = await axiosWithAuth('/api/user')
    console.log(res)
  } catch (error) {
    console.log(error)
  }
}

async function getUsersFromDb() {
  try {
    const res = await axiosWithAuth('/api/users')
    console.log(res)
  } catch (error) {
    console.log(error)
  }
}

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
        console.log(`tokens for user with email: ${email} are refreshed`)
      } catch (error) {
        console.log(error)
      }
    }
    refreshTokens()
  })

  return (
    <main css={{ margin: '10px' }}>
      <Outlet />
      <h3>Main component</h3>
      <button onClick={() => notify({ msg: 'hi' })}>say hi in bottom popup</button>
      <button onClick={getEmailFromDb}>get user's email from db</button>
      <button onClick={getUsersFromDb}>get users from db</button>
    </main>
  )
}
