import { EventType } from '@src/types'
import { useEffect, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Avatar } from '@mui/material'
import { theme } from '@src/theme'
import { LockOutlined } from '@mui/icons-material'
import { EmailInput } from './common/EmailInput'
import { PasswordInput } from './common/PasswordInput'
import { ConfirmPasswordInput } from './common/ConfirmPasswordInput'
import { ButtonCustom } from '@src/common_components/ButtonCustom'
import { useRegister } from './useRegister'
import { BackdropWithSlidableContent } from '@src/common_components/BackdropWithSlidableContent'
import { CardCustom } from '@src/common_components/CardCustom'
import { slideElement } from '@functions/slideElement'

export function Register() {
  const [email, setEmail] = useState('')
  const inputRef = useRef() as React.MutableRefObject<HTMLDivElement>
  const cardRef = useRef() as React.MutableRefObject<HTMLDivElement>
  const [isEmailOk, setIsEmailOk] = useState(false)
  const [password, setPassword] = useState('')
  const [isConfirmPasswordOk, setIsConfirmPasswordOk] = useState(false)
  const [isButtonDisabled, setIsButtonDisabled] = useState(true)
  const { registerUser, httpStatus, setHttpStatus } = useRegister()
  const navigate = useNavigate()
  useEffect(() => setIsButtonDisabled(!(isEmailOk && isConfirmPasswordOk)), [isEmailOk, isConfirmPasswordOk])

  return (
    <BackdropWithSlidableContent
      onSlideIn={() => inputRef.current.focus()}
      onSlideOut={() => navigate('/')}
    >
      <CardCustom
        title="Register"
        logo={
          <Avatar sx={{ m: 1, bgcolor: theme.colors.darkBackground }}>
            <LockOutlined />
          </Avatar>
        }
        reference={cardRef}
      >
        <form onSubmit={(e: EventType) => registerUser({ e, email, password })} >
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
          <ConfirmPasswordInput
            originalPassword={password}
            isConfirmPasswordOk={isConfirmPasswordOk}
            setIsConfirmPasswordOk={setIsConfirmPasswordOk}
          />
          <ButtonCustom
            content="REGISTER"
            disabled={isButtonDisabled}
            httpStatus={httpStatus}
            setHttpStatus={setHttpStatus}
          />
          <div css={{ textAlign: 'right', marginTop: '20px' }}>
            <Link
              to="/login"
              children='Log in?'
              onClick={(e: EventType) => {
                e.preventDefault()
                slideElement({ element: cardRef.current, cb: () => navigate('/login') })
              }}
            />
          </div>
        </form>
      </CardCustom>
    </BackdropWithSlidableContent>
  )
}
