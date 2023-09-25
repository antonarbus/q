import type { FormEvent, MouseEvent } from 'react'
import { useEffect, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Avatar } from '@mui/material'
import { theme } from 'client/shared/clients'
import { LockOutlined } from '@mui/icons-material'
import { EmailInput } from './common/EmailInput'
import { PasswordInput } from './common/PasswordInput'
import { ConfirmPasswordInput } from './common/ConfirmPasswordInput'
import { useRegister } from './useRegister'
import { slideElement } from 'client/shared/lib/slideElement'
import { BackdropWithSlidableContent } from 'client/shared/components/BackdropWithSlidableContent'
import { CardCustom } from 'client/shared/components/CardCustom'
import { ButtonCustom } from 'client/shared/components/ButtonCustom'

export const Register = (): JSX.Element => {
  const [email, setEmail] = useState('')
  const inputRef = useRef<HTMLDivElement>(null)
  const cardRef = useRef<HTMLDivElement>(null)
  const [isEmailOk, setIsEmailOk] = useState(false)
  const [password, setPassword] = useState('')
  const [isConfirmPasswordOk, setIsConfirmPasswordOk] = useState(false)
  const [isButtonDisabled, setIsButtonDisabled] = useState(true)
  const { registerUser, httpStatus, setHttpStatus } = useRegister()
  const navigate = useNavigate()

  useEffect(() => {
    setIsButtonDisabled(!(isEmailOk && isConfirmPasswordOk))
  }, [isEmailOk, isConfirmPasswordOk])

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
        title='Register'
        logo={
          <Avatar sx={{ m: 1, bgcolor: theme.colors.darkBackground }}>
            <LockOutlined />
          </Avatar>
        }
        reference={cardRef}
      >
        <form
          onSubmit={async (e: FormEvent): Promise<void> => {
            await registerUser({ e, email, password })
          }}
        >
          <EmailInput
            email={email}
            setEmail={setEmail}
            isEmailOk={isEmailOk}
            setIsEmailOk={setIsEmailOk}
            inputRef={inputRef}
          />
          <PasswordInput password={password} setPassword={setPassword} />
          <ConfirmPasswordInput
            originalPassword={password}
            isConfirmPasswordOk={isConfirmPasswordOk}
            setIsConfirmPasswordOk={setIsConfirmPasswordOk}
          />
          <ButtonCustom
            content='REGISTER'
            disabled={isButtonDisabled}
            httpStatus={httpStatus}
            setHttpStatus={setHttpStatus}
          />
          <div css={{ textAlign: 'right', marginTop: '20px' }}>
            <Link
              to='/login'
              children='Log in?'
              onClick={(e: MouseEvent): void => {
                if (!cardRef.current) return
                e.preventDefault()
                slideElement({
                  element: cardRef.current,
                  cb: () => {
                    navigate('/login')
                  },
                })
              }}
            />
          </div>
        </form>
      </CardCustom>
    </BackdropWithSlidableContent>
  )
}
