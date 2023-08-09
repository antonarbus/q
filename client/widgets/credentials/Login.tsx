import type { Event, RefDiv } from 'client/shared/types'
import { useState, useEffect, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Avatar } from '@mui/material'
import { theme } from 'client/shared/clients'
import { EmailInput } from './common/EmailInput'
import { PasswordInput } from './common/PasswordInput'
import { useLogin } from './useLogin'
import { LoginRounded } from '@mui/icons-material'
import { slideElement } from 'client/shared/lib/slideElement'
import { BackdropWithSlidableContent } from 'client/shared/components/BackdropWithSlidableContent'
import { CardCustom } from 'client/shared/components/CardCustom'
import { ButtonCustom } from 'client/shared/components/ButtonCustom'

// todo: store user data in redux

export const Login = (): JSX.Element => {
  const [email, setEmail] = useState('')
  const inputRef = useRef() as RefDiv
  const cardRef = useRef() as RefDiv
  const [isEmailOk, setIsEmailOk] = useState(false)
  const [password, setPassword] = useState('')
  const [isButtonDisabled, setIsButtonDisabled] = useState(true)
  const { loginUser, httpStatus, setHttpStatus } = useLogin()
  const navigate = useNavigate()
  useEffect(
    () => {
      setIsButtonDisabled(!(isEmailOk && !!password))
    },
    [isEmailOk, password],
  )

  return (
    <BackdropWithSlidableContent
      onSlideIn={(): void => {

        /* inputRef.current.focus() */
      }}
      onSlideOut={(): void => {
        navigate('/')
      }}
    >
      <CardCustom
        title='Log in'
        logo={
          <Avatar sx={{ m: 1, bgcolor: theme.colors.darkBackground }}>
            <LoginRounded />
          </Avatar>
        }
        reference={cardRef}
      >
        <form
          onSubmit={async (e: Event) =>
            loginUser({ e, email, password, cardElement: cardRef.current })
          }
        >
          <EmailInput
            email={email}
            setEmail={setEmail}
            isEmailOk={isEmailOk}
            setIsEmailOk={setIsEmailOk}
            inputRef={inputRef}
          />
          <PasswordInput password={password} setPassword={setPassword} />
          <ButtonCustom
            content='LOG IN'
            disabled={isButtonDisabled}
            httpStatus={httpStatus}
            setHttpStatus={setHttpStatus}
          />
          <div
            css={{
              display: 'flex',
              justifyContent: 'space-between',
              marginTop: '20px',
            }}
          >
            <Link
              to='/reset'
              children='Reset?'
              onClick={(e: Event): void => {
                e.preventDefault()
                slideElement({
                  element: cardRef.current,
                  cb: () => {
                    navigate('/reset')
                  },
                })
              }}
            />
            <Link
              to='/register'
              children='Register?'
              onClick={(e: Event): void => {
                e.preventDefault()
                slideElement({
                  element: cardRef.current,
                  cb: () => {
                    navigate('/register')
                  },
                })
              }}
              css={{ textAlign: 'right' }}
            />
          </div>
        </form>
      </CardCustom>
    </BackdropWithSlidableContent>
  )
}
