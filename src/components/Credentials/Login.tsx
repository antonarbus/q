import { EventType } from '@src/types'
import { useState, useEffect, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Avatar } from '@mui/material'
import { BackdropWithSlidableContent } from '@components/Common/BackdropWithSlidableContent'
import { CardCustom } from '@components/Common/CardCustom'
import { theme } from '@src/theme'
import { LockOutlined } from '@mui/icons-material'
import { EmailInput } from './common/EmailInput'
import { PasswordInput } from './common/PasswordInput'
import { ButtonCustom } from '@components/Common/ButtonCustom'
import { slideElement } from '@functions/slideElement'
import { useLogin } from './useLogin'

// todo: store user data in redux

export function Login() {
  const [email, setEmail] = useState('')
  const inputRef = useRef() as React.MutableRefObject<HTMLDivElement>
  const cardRef = useRef() as React.MutableRefObject<HTMLDivElement>
  const [isEmailOk, setIsEmailOk] = useState(false)
  const [password, setPassword] = useState('')
  const [isButtonDisabled, setIsButtonDisabled] = useState(true)
  const { loginUser, httpStatus, setHttpStatus } = useLogin()
  const navigate = useNavigate()
  useEffect(() => setIsButtonDisabled(!(isEmailOk && !!password)), [isEmailOk, password])

  return (
    <BackdropWithSlidableContent
      onSlideIn={() => inputRef.current.focus()}
      onSlideOut={() => navigate('/')}
    >
      <CardCustom
        title="Log in"
        logo={
          <Avatar sx={{ m: 1, bgcolor: theme.colors.darkBackground }}>
            <LockOutlined />
          </Avatar>
        }
        reference={cardRef}
      >
        <form onSubmit={(e: EventType) => loginUser({ e, email, password })} >
          <EmailInput
            email={email}
            setEmail={setEmail}
            isEmailOk={isEmailOk}
            setIsEmailOk={setIsEmailOk}
            inputRef={inputRef}
          />
          <PasswordInput
            password={password}
            setPassword={setPassword}
          />
          <ButtonCustom
            content="LOG IN"
            disabled={isButtonDisabled}
            httpStatus={httpStatus}
            setHttpStatus={setHttpStatus}
          />
          <div css={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
            <Link
              to="/reset"
              children='Forgot password?'
              onClick={(e: EventType) => {
                e.preventDefault()
                slideElement({ element: cardRef.current, cb: () => navigate('/reset') })
              }}
            />
            <Link
              to="/register"
              children='No account? Sign up...'
              onClick={(e: EventType) => {
                e.preventDefault()
                slideElement({ element: cardRef.current, cb: () => navigate('/register') })
              }}
            />
          </div>
        </form>
      </CardCustom>
    </BackdropWithSlidableContent>
  )
}
