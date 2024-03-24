import { theme } from '@lib_instances/theme'
import PasswordRoundedIcon from '@mui/icons-material/PasswordRounded'
import { Avatar } from '@mui/material'
import type { FormEvent } from 'react'
import { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { EmailInput } from '@shared/components'
import { BackdropWithSlidableContent } from '@shared/components/BackdropWithSlidableContent'
import { ButtonCustom } from '@shared/components/ButtonCustom'
import { CardCustom } from '@shared/components/CardCustom'
import { useReset } from './useReset'

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
        navigate('..')
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
        <form onSubmit={async (e: FormEvent): Promise<void> => {
          await resetPassword({ e, email })
        }}>
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
