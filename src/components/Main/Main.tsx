import { notify } from '@components/Notifier/notify'
import React, { useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import styled from 'styled-components'
// import jwt from 'jsonwebtoken'
// eslint-disable-next-line camelcase
import jwt_decode from 'jwt-decode'

async function getDateFromDb() {
  const jwtToken = localStorage.getItem('jwtToken')
  const headers = { 'x-access-token': jwtToken || '' }
  const options = { headers }
  const res = await fetch('/api/user', options)
  const data = await res.json()
  console.log(data)
}

export function Main() {
  useEffect(function checkCredentials() {
    const jwtToken = localStorage.getItem('jwtToken')
    console.log('jwtToken', jwtToken)
    if (!jwtToken) return
    const user = jwt_decode(jwtToken, { header: true })
    if (!user) {
      alert('not logged in, put a mark in redux and maybe redirect to login page')
      return
    }
    if (user) alert('logged in, put a mark in redux')
    console.log('user', user)
    getDateFromDb()
  }, [])
  return (
    <MainStyled>
      <Outlet />
      <h3>Main component</h3>
      <button onClick={() => notify('hi')}>say hi in bottom popup</button>
    </MainStyled>
  )
}

const MainStyled = styled.main`
  border: 1px solid grey;
  border-radius: 6px;
  padding: 10px;
  margin: 10px;
`
