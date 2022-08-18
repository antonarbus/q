import { EventType } from '@src/types'
import { useState } from 'react'
import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'

// todo: make component as a dialog but connect it to the link via router-dom

export function Login() {
  const navigate = useNavigate()
  const [credentials, setCredentials] = useState({ email: '', password: '' })
  const handleChange = (e: EventType) => {
    const target = (e.target as HTMLInputElement)
    setCredentials({ ...credentials, [target.name]: target.value })
  }

  async function loginUser(e: EventType) {
    e.preventDefault()
    const method = 'POST'
    const headers = { 'Content-Type': 'application/json' }
    const { email, password } = credentials
    const body = JSON.stringify({ email, password })
    const options = { method, headers, body }
    const res = await fetch('/api/login', options)
    const data = await res.json()
    console.log(data)
    if (data.status === 'user logged in') {
      localStorage.setItem('jwtToken', data.jwtToken)
      alert('logged in')
      navigate('/')
    }
    if (data.status === 'error during logging in') alert('check your user name and password')
  }

  return (
    <LoginStyled>
      <h1>Login</h1>
      <form onSubmit={loginUser}>
        <input
          type="text"
          name="email"
          id="email"
          placeholder='Email'
          value={credentials.email}
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          id="password"
          placeholder='Password'
          value={credentials.password}
          onChange={handleChange}
        />
        <button type="submit">Login</button>
      </form>
    </LoginStyled>
  )
}

const LoginStyled = styled.div`
  input {
    display: block;
    width: 300px;
    outline: none;
    border: 1px solid #c4c4c4;
    border-radius: 6px;
    /* box-shadow: inset #00000033 0px 0px 3px 0px; */
    padding: 10px 10px 10px 10px;
  }
`
