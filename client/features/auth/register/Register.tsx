import { theme } from '@lib_instances/theme'
import { LockOutlined } from '@mui/icons-material'
import { Avatar, Box } from '@mui/material'
import { useSignal } from '@preact/signals-react'
import type { FormEvent, MouseEvent } from 'react'
import { useEffect, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ConfirmPasswordInput, EmailInput, PasswordInput } from '@shared/components'
import { BackdropWithSlidableContent } from '@shared/components/BackdropWithSlidableContent'
import { ButtonCustom } from '@shared/components/ButtonCustom'
import { CardCustom } from '@shared/components/CardCustom'
import { route } from '@shared/consts/route'
import { slideElement } from '@shared/utils/slideElement'
import { useRegister } from './useRegister'

export const Register = (): JSX.Element => {
  const navigate = useNavigate()
  const inputRef = useRef<HTMLDivElement>(null)
  const cardRef = useRef<HTMLDivElement>(null)

  const emailSignal = useSignal('')
  const passwordSignal = useSignal('')
  const isEmailOkSignal = useSignal(false)
  const isConfirmPasswordOkSignal = useSignal(false)
  const isButtonDisabledSignal = useSignal(false)

  const { registerUser } = useRegister()

  useEffect(() => {
    isButtonDisabledSignal.value = !(isEmailOkSignal.value && isConfirmPasswordOkSignal.value)
  }, [isEmailOkSignal.value, isConfirmPasswordOkSignal.value])

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
        reference={cardRef}
        title='Register'
        logo={
          <Avatar sx={{ m: 1, bgcolor: theme.colors.darkBackground }}>
            <LockOutlined />
          </Avatar>
        }
      >
        <form
          onSubmit={async (e: FormEvent): Promise<void> => {
            await registerUser({
              e,
              email: emailSignal.value,
              password: passwordSignal.value,
            })
          }}
        >
          <EmailInput
            inputRef={inputRef}
            emailSignal={emailSignal}
            isEmailOkSignal={isEmailOkSignal}
          />
          <PasswordInput
            passwordSignal={passwordSignal}
          />
          <ConfirmPasswordInput
            originalPassword={passwordSignal.value}
            isConfirmPasswordOkSignal={isConfirmPasswordOkSignal}
          />
          <ButtonCustom
            disabled={isButtonDisabledSignal.value}
          >
            REGISTER
          </ButtonCustom>
          <Box
            sx={{ textAlign: 'right', marginTop: '20px' }}
          >
            <Link
              to={`../${route.login}`}
              onClick={(e: MouseEvent): void => {
                if (!cardRef.current) return
                e.preventDefault()

                slideElement({
                  element: cardRef.current,
                  cb: () => {
                    navigate(`../${route.login}`)
                  },
                })
              }}
            >
              Log in?
            </Link>
          </Box>
        </form>
      </CardCustom>
    </BackdropWithSlidableContent>
  )
}
