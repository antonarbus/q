import { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Avatar } from '@mui/material'
import { CardCustom } from 'client/components/CardCustom'
import { ButtonCustom } from 'client/components/ButtonCustom'
import { useReset } from './useReset'
import { Event, RefDiv } from 'client/types'
import { EmailInput } from './common/EmailInput'
import { theme } from 'client/theme'
import { BackdropWithSlidableContent } from 'client/components/BackdropWithSlidableContent'
import PasswordRoundedIcon from '@mui/icons-material/PasswordRounded'

export function Reset() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const inputRef = useRef() as RefDiv
  const { resetPassword, httpStatus, setHttpStatus } = useReset()
  const [isEmailOk, setIsEmailOk] = useState(false)

  return (
    <BackdropWithSlidableContent
      onSlideIn={() => { /* inputRef.current.focus() */ }}
      onSlideOut={() => navigate('/')}
    >
      <CardCustom
        title="Reset password"
        logo={
          <Avatar sx={{ m: 1, bgcolor: theme.colors.darkBackground }}>
            <PasswordRoundedIcon />
          </Avatar>
        }
      >
        <form onSubmit={(e: Event) => resetPassword({ e, email })}>
          <EmailInput
            email={email}
            setEmail={setEmail}
            isEmailOk={isEmailOk}
            setIsEmailOk={setIsEmailOk}
            inputRef={inputRef}
          />
          <ButtonCustom
            content="RESET"
            disabled={!isEmailOk}
            httpStatus={httpStatus}
            setHttpStatus={setHttpStatus}
          />
        </form>
      </CardCustom>
    </BackdropWithSlidableContent>
  )
}
