import { notify } from '@components/Notifier/notify'
import React, { useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom'
import styled from 'styled-components'
// eslint-disable-next-line camelcase
import jwt_decode from 'jwt-decode'
import axios from 'axios'
import { axiosWithAuth, baseURL } from '@src/axios/axios'

export function Main() {
  async function getEmailFromDb() {
    try {
      const res = await axiosWithAuth('/api/user')
      // const data = await res.json()
      console.log(res)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(function isUserLoggedIn() {
    async function refreshTokens() {
      try {
        if (!localStorage.getItem('accessJwtToken')) return
        const response = await axios.get(`${baseURL}/api/refresh`, { withCredentials: true })
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
    </MainStyled>
  )
}

const MainStyled = styled.main`
  border: 1px solid grey;
  border-radius: 6px;
  padding: 10px;
  margin: 10px;
`
