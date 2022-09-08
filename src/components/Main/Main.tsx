import { notify } from '@components/Notifier/notify'
import { useEffect } from 'react'
import { Outlet } from 'react-router-dom'
// eslint-disable-next-line camelcase
import jwt_decode from 'jwt-decode'
import axios from 'axios'
import { axiosWithAuth } from '@src/axios/axios'
import { useEffectOnce } from 'react-use'

const mainCss = { border: '1px solid grey', borderRadius: '6px', padding: '10px', margin: '10px' }

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
  useEffectOnce(function isUserLoggedIn() {
    async function refreshTokens() {
      // todo: move function into 'functions' folder in a file of folder with credentials business logic
      // todo: separate helper files by a business logic
      try {
        if (!localStorage.getItem('accessJwtToken')) return console.log('user is not logged in')
        const response = await axios.get('/api/refresh', { withCredentials: true })
        if (response.data.status === 'error') {
          console.log(response.data.message)
          localStorage.removeItem('accessJwtToken')
        }
        if (!response.data.accessJwtToken) return console.log(666)
        const accessJwtToken = response.data.accessJwtToken
        const jwtTokenPayload: {email: string | undefined} = jwt_decode(accessJwtToken)
        const { email } = jwtTokenPayload
        if (!email) return console.log('token is not valid')
        localStorage.setItem('accessJwtToken', response.data.accessJwtToken)
        console.log(response)
        console.log(`tokens for user with email: ${email} are refreshed`)
      } catch (error) {
        console.log(error)
      }
    }
    refreshTokens()
  })

  return (
    <main css={mainCss}>
      <Outlet />
      <h3>Main component</h3>
      <button onClick={() => notify({ msg: 'hi' })}>say hi in bottom popup</button>
      <button onClick={getEmailFromDb}>get user's email from db</button>
      <button onClick={getUsersFromDb}>get users from db</button>
    </main>
  )
}
