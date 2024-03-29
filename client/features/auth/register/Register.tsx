import { theme } from '@lib_instances/theme'
import { LockOutlined } from '@mui/icons-material'
import { Avatar, Box } from '@mui/material'
import { useSignal, useSignalEffect } from '@preact/signals-react'
import type { FormEvent, MouseEvent } from 'react'
import { useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useUpdateEffect } from 'react-use'
import { useRegisterMutation } from '@entities/user'
import { ConfirmPasswordInput, EmailInput, PasswordInput } from '@shared/components'
import { BackdropWithSlidableContent } from '@shared/components/BackdropWithSlidableContent'
import { ButtonCustom } from '@shared/components/ButtonCustom'
import { CardCustom } from '@shared/components/CardCustom'
import { route } from '@shared/consts/route'
import { notify } from '@shared/ui/top_msg'
import { slideElement } from '@shared/utils/slideElement'

export const Register = (): JSX.Element => {
  const navigate = useNavigate()
  const inputRef = useRef<HTMLDivElement>(null)
  const cardRef = useRef<HTMLDivElement>(null)

  const emailSignal = useSignal('')
  const passwordSignal = useSignal('')
  const isEmailOkSignal = useSignal(false)
  const isConfirmPasswordOkSignal = useSignal(false)
  const isButtonDisabledSignal = useSignal(false)

  const { mutate: register, isPending, data, isSuccess, isError, error } = useRegisterMutation()

  useSignalEffect(() => {
    isButtonDisabledSignal.value = !(isEmailOkSignal.value && isConfirmPasswordOkSignal.value)
  })

  useUpdateEffect(() => {
    if (!isSuccess) return

    if (data.message === 'activation link sent') {
      notify({ msg: 'Check your mailbox.', theme: 'light' })
    }
  }, [isSuccess])

  useUpdateEffect(() => {
    if (!isError) return

    if (error.response?.data.message === 'already exists') {
      notify({ msg: 'Already exists', type: 'info', theme: 'light' })
      return
    }

    if (error.response?.data.message === 'validation error') {
      notify({ msg: 'Validation error', type: 'warn', theme: 'light' })
      return
    }

    notify({ msg: 'Internal error', type: 'error', theme: 'light' })
  }, [isError])

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
            e.preventDefault()
            register({
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
            originalPasswordSignal={passwordSignal}
            isConfirmPasswordOkSignal={isConfirmPasswordOkSignal}
          />
          <ButtonCustom
            disabled={isButtonDisabledSignal.value}
            isPending={isPending}
            isSuccess={isSuccess}
            isError={isError}
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
