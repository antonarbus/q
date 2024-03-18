import { theme } from '@lib_instances/theme'
import { LoginRounded } from '@mui/icons-material'
import { Avatar } from '@mui/material'
import type { FormEvent, MouseEvent } from 'react'
import { useState, useEffect, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { BackdropWithSlidableContent } from '@shared/components/BackdropWithSlidableContent'
import { ButtonCustom } from '@shared/components/ButtonCustom'
import { CardCustom } from '@shared/components/CardCustom'
import { route } from '@shared/consts/route'
import { slideElement } from '@shared/utils/slideElement'
import { EmailInput } from './common/EmailInput'
import { PasswordInput } from './common/PasswordInput'
import { useLogin } from './useLogin'

export const Login = (): JSX.Element => {
  const inputRef = useRef<HTMLDivElement>(null)
  const cardRef = useRef<HTMLDivElement>(null)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isEmailOk, setIsEmailOk] = useState(false)
  const [isButtonDisabled, setIsButtonDisabled] = useState(true)
  const { loginUser, httpStatus, setHttpStatus } = useLogin()
  const navigate = useNavigate()

  useEffect(() => {
    setIsButtonDisabled(!isEmailOk || password === '')
  }, [isEmailOk, password])

  return (
    <BackdropWithSlidableContent
      onSlideIn={() => {
        /* inputRef.current.focus() */
      }}
      onSlideOut={() => {
        navigate('..')
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
          onSubmit={(e: FormEvent): void => {
            if (!cardRef.current) return
            void loginUser({ e, email, password, cardElement: cardRef.current })
          }}
        >
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
              to={`../${route.reset}`}
              children='Reset?'
              onClick={(e: MouseEvent): void => {
                e.preventDefault()
                if (!cardRef.current) return
                slideElement({
                  element: cardRef.current,
                  cb: () => {
                    navigate(`../${route.reset}`)
                  },
                })
              }}
            />
            <Link
              to={`../${route.register}`}
              children='Register?'
              onClick={(e: MouseEvent): void => {
                if (!cardRef.current) return
                e.preventDefault()
                slideElement({
                  element: cardRef.current,
                  cb: () => {
                    navigate(`../${route.register}`)
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
