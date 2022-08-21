import { notify } from '@components/Notifier/notify'
import React, { useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom'
import styled from 'styled-components'
import jwt from 'jsonwebtoken'
// eslint-disable-next-line camelcase
import jwt_decode from 'jwt-decode'

export function Main() {
  const [user, setUser] = useState('not logged in')

  async function getEmailFromDb() {
    const accessJwtToken = localStorage.getItem('accessJwtToken')
    if (!accessJwtToken) return console.log('no token stored')
    const options = { headers: { auth: accessJwtToken } }
    const res = await fetch('/api/user', options)
    const data = await res.json()
    console.log(data)
  }

  useEffect(function getEmailFromToken() {
    const accessJwtToken = localStorage.getItem('accessJwtToken')
    if (!accessJwtToken) return
    try {
      const jwtTokenPayload: {email: string | undefined} = jwt_decode(accessJwtToken)
      const { email } = jwtTokenPayload
      if (!email) return
      setUser(email)
    } catch (error) {
      console.log(error)
    }
  }, [])
  return (
    <MainStyled>
      <Outlet />
      <h3>Main component</h3>
      <h5>User: <b>{user}</b></h5>
      <button onClick={() => notify('hi')}>say hi in bottom popup</button>
      <button onClick={getEmailFromDb}>get user's email from db</button>
    </MainStyled>
  )
}

const MainStyled = styled.main`
  border: 1px solid grey;
  border-radius: 6px;
  padding: 10px;
  margin: 10px;
`
