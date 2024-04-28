import { dispatch } from '@lib_instances/store'
import { theme } from '@lib_instances/theme'
import { Avatar, Box } from '@mui/material'
import { useSignal, useSignalEffect } from '@preact/signals-react'
import type { FormEvent, MouseEvent, ReactNode } from 'react'
import { useRef } from 'react'
import { MdPassword } from 'react-icons/md'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useUpdateEffect } from 'react-use'
import { useResetPasswordMutation, userSlice } from '@entities/user'
import { accessTokenSignal } from '@shared/auth/accessTokenSignal'
import { ConfirmPasswordInput, EmailInput, PasswordInput } from '@shared/components'
import { BackdropWithSlidableContent } from '@shared/components/BackdropWithSlidableContent'
import { ButtonCustom } from '@shared/components/ButtonCustom'
import { CardCustom } from '@shared/components/CardCustom'
import { navItemId } from '@shared/consts/navItemId'
import { route } from '@shared/consts/route'
import { navSlice } from '@shared/nav'
import { notify } from '@shared/ui/top_msg'
import { slideElement } from '@shared/utils/slideElement'

export const ResetPassword = (): ReactNode => {
  const { email, resetPasswordKey } = useParams()
  const navigate = useNavigate()
  const inputRef = useRef<HTMLDivElement>(null)
  const cardRef = useRef<HTMLDivElement>(null)

  const emailSignal = useSignal(email ?? 'email is missing')
  const passwordSignal = useSignal('')
  const isEmailOkSignal = useSignal(true)
  const isConfirmPasswordOkSignal = useSignal(false)
  const isButtonDisabledSignal = useSignal(false)

  const { mutate: resetPassword, isPending, data, isSuccess, isError, error } = useResetPasswordMutation()

  useSignalEffect(() => {
    isButtonDisabledSignal.value = !isConfirmPasswordOkSignal.value
  })

  useUpdateEffect(() => {
    if (!isSuccess) return

    if (data.message === 'password was reset') {
      notify({ msg: 'Password was reset.', theme: 'light' })

      const { accessJwtToken, email, roles } = data

      if (!accessJwtToken) return
      if (!email) return
      if (!roles) return

      accessTokenSignal.value = accessJwtToken
      dispatch(userSlice.actions.rememberLoggedUser({ email, roles }))
      dispatch(navSlice.actions.hideNavItems({ navItemIdKeys: [navItemId.login] }))
      dispatch(navSlice.actions.showNavItems({ navItemIdKeys: [navItemId.account] }))
    }
  }, [isSuccess])

  useUpdateEffect(() => {
    if (!isError) return

    if (error.response?.data.message === 'incorrect reset key') {
      notify({ msg: 'Incorrect reset key', type: 'warn', theme: 'light' })
      return
    }

    if (error.response?.data.message === 'validation error') {
      notify({ msg: 'Validation error', type: 'warn', theme: 'light' })
      return
    }

    if (error.response?.data.message === 'not activated') {
      notify({ msg: 'Account not activated', type: 'warn', theme: 'light' })
      return
    }

    notify({ msg: 'Internal error', type: 'error', theme: 'light' })
  }, [isError])

  if (email === undefined) return null
  if (resetPasswordKey === undefined) return null

  return (
    <BackdropWithSlidableContent
      shouldSlideIn={false}
      onSlideIn={(): void => {
        /* inputRef.current.focus() */
      }}
      onSlideOut={(): void => {
        navigate('..')
      }}
    >
      <CardCustom
        reference={cardRef}
        title='Reset password'
        logo={
          <Avatar sx={{ m: 1, bgcolor: theme.colors.darkBackground }}>
            <MdPassword />
          </Avatar>
        }
      >
        <form
          onSubmit={async (e: FormEvent): Promise<void> => {
            e.preventDefault()
            resetPassword({
              password: passwordSignal.value,
              email,
              resetPasswordKey,
            })
          }}
        >
          <EmailInput
            disabled
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
            Reset
          </ButtonCustom>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              marginTop: '20px',
            }}
          >
            <Link
              to={`../${route.register}`}
              style={{ textAlign: 'right' }}
              onClick={(e: MouseEvent): void => {
                e.preventDefault()
                slideElement({
                  element: cardRef.current,
                  onSlide: () => {
                    navigate(`../${route.register}`)
                  },
                })
              }}
            >
              Register?
            </Link>
            <Link
              to={`../${route.login}`}
              onClick={(e: MouseEvent): void => {
                if (!cardRef.current) return
                e.preventDefault()

                slideElement({
                  element: cardRef.current,
                  onSlide: () => {
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
