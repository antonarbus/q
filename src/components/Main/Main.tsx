import { notify } from '@components/Notifier/notify'
import { useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import styled from '@emotion/styled'
// eslint-disable-next-line camelcase
import jwt_decode from 'jwt-decode'
import axios from 'axios'
import { axiosWithAuth } from '@src/axios/axios'

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
  useEffect(function isUserLoggedIn() {
    async function refreshTokens() {
      try {
        if (!localStorage.getItem('accessJwtToken')) return
        const response = await axios.get('/api/refresh', { withCredentials: true })
        if (!response.data.accessJwtToken) return
        const accessJwtToken = response.data.accessJwtToken
        const jwtTokenPayload: {email: string | undefined} = jwt_decode(accessJwtToken)
        const { email } = jwtTokenPayload
        if (!email) return
        localStorage.setItem('accessJwtToken', response.data.accessJwtToken)
        console.log(response)
        console.log(`tokens for user with email: ${email} are refreshed`)
      } catch (error) {
        console.log(error)
      }
    }
    refreshTokens()
  }, [])

  return (
    <MainStyled>
      <Outlet />
      <h3>Main component</h3>
      <button onClick={() => notify('hi')}>say hi in bottom popup</button>
      <button onClick={getEmailFromDb}>get user's email from db</button>
      <button onClick={getUsersFromDb}>get users from db</button>
    </MainStyled>
  )
}

const MainStyled = styled.main`
  border: 1px solid grey;
  border-radius: 6px;
  padding: 10px;
  margin: 10px;
`
