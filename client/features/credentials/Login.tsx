import { EventType, RefDivType } from 'client/types'
import { useState, useEffect, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Avatar } from '@mui/material'
import { BackdropWithSlidableContent } from 'client/components/BackdropWithSlidableContent'
import { CardCustom } from 'client/components/CardCustom'
import { theme } from 'client/theme'
import { EmailInput } from './common/EmailInput'
import { PasswordInput } from './common/PasswordInput'
import { ButtonCustom } from 'client/components/ButtonCustom'
import { useLogin } from './useLogin'
import { LoginRounded } from '@mui/icons-material'
import { slideElement } from 'utils/slideElement'

// todo: store user data in redux

export function Login() {
  const [email, setEmail] = useState('')
  const inputRef = useRef() as RefDivType
  const cardRef = useRef() as RefDivType
  const [isEmailOk, setIsEmailOk] = useState(false)
  const [password, setPassword] = useState('')
  const [isButtonDisabled, setIsButtonDisabled] = useState(true)
  const { loginUser, httpStatus, setHttpStatus } = useLogin()
  const navigate = useNavigate()
  useEffect(() => setIsButtonDisabled(!(isEmailOk && !!password)), [isEmailOk, password])

  return (
    <BackdropWithSlidableContent
      onSlideIn={() => { /* inputRef.current.focus() */ }}
      onSlideOut={() => navigate('/')}
    >
      <CardCustom
        title="Log in"
        logo={
          <Avatar sx={{ m: 1, bgcolor: theme.colors.darkBackground }}>
            <LoginRounded />
          </Avatar>
        }
        reference={cardRef}
      >
        <form onSubmit={(e: EventType) => loginUser({ e, email, password, cardElement: cardRef.current })} >
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
              children='Reset?'
              onClick={(e: EventType) => {
                e.preventDefault()
                slideElement({ element: cardRef.current, cb: () => navigate('/reset') })
              }}
            />
            <Link
              to="/register"
              children='Register?'
              onClick={(e: EventType) => {
                e.preventDefault()
                slideElement({ element: cardRef.current, cb: () => navigate('/register') })
              }}
              css={{ textAlign: 'right' }}
            />
          </div>
        </form>
      </CardCustom>
    </BackdropWithSlidableContent>
  )
}
