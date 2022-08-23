import { EventType } from '@src/types'
import { forwardRef, useState } from 'react'
import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'
import Dialog from '@mui/material/Dialog'
import DialogContent from '@mui/material/DialogContent'
import Slide from '@mui/material/Slide'
import { TransitionProps } from '@mui/material/transitions'

const Transition = forwardRef(function Transition(props: TransitionProps & { children: React.ReactElement<any, any>; }, ref: React.Ref<unknown>) {
  return <Slide direction="up" ref={ref} {...props} />
})

// todo: make component as a dialog but connect it to the link via router-dom
// todo: store user data in redux

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
    if (data.status === 'error') {
      alert(data.message)
      return localStorage.removeItem('accessJwtToken')
    }
    localStorage.setItem('accessJwtToken', data.accessJwtToken)
    alert('logged in')
    navigate('/')
  }

  const [open, setOpen] = useState(true)

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  return (
    <Dialog
      open={open}
      TransitionComponent={Transition}
      keepMounted
      onClose={handleClose}
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogContent>
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
      </DialogContent>
    </Dialog>
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
