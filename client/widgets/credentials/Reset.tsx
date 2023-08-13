import { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Avatar } from '@mui/material'
import { useReset } from './useReset'
import type { Event } from 'client/shared/types'
import { EmailInput } from './common/EmailInput'
import { theme } from 'client/shared/clients'
import PasswordRoundedIcon from '@mui/icons-material/PasswordRounded'
import { BackdropWithSlidableContent } from 'client/shared/components/BackdropWithSlidableContent'
import { CardCustom } from 'client/shared/components/CardCustom'
import { ButtonCustom } from 'client/shared/components/ButtonCustom'

export const Reset = (): JSX.Element => {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const inputRef = useRef<HTMLDivElement>(null)
  const { resetPassword, httpStatus, setHttpStatus } = useReset()
  const [isEmailOk, setIsEmailOk] = useState(false)

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
        title='Reset password'
        logo={
          <Avatar sx={{ m: 1, bgcolor: theme.colors.darkBackground }}>
            <PasswordRoundedIcon />
          </Avatar>
        }
      >
        <form onSubmit={(e: Event): void => void resetPassword({ e, email })}>
          <EmailInput
            email={email}
            setEmail={setEmail}
            isEmailOk={isEmailOk}
            setIsEmailOk={setIsEmailOk}
            inputRef={inputRef}
          />
          <ButtonCustom
            content='RESET'
            disabled={!isEmailOk}
            httpStatus={httpStatus}
            setHttpStatus={setHttpStatus}
          />
        </form>
      </CardCustom>
    </BackdropWithSlidableContent>
  )
}
