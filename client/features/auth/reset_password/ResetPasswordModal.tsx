import { dispatch } from '@lib_instances/store'
import { Box } from '@mui/material'
import { useSignal, useSignalEffect } from '@preact/signals-react'
import type { MouseEvent } from 'react'
import { useCallback, useRef } from 'react'
import { MdPassword } from 'react-icons/md'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useUpdateEffect } from 'react-use'
import { useResetPasswordMutation, userSlice } from '@entities/user'
import { accessTokenSignal } from '@shared/auth/accessTokenSignal'
import { ConfirmPasswordInput, EmailInput, FormModal, PasswordInput } from '@shared/components'
import { navItemId } from '@shared/consts/navItemId'
import { route } from '@shared/consts/route'
import { navSlice } from '@shared/nav'
import { notify } from '@shared/ui/top_msg'
import { slideElement } from '@shared/utils/slideElement'

export const ResetPasswordModal = (): React.ReactNode => {
  const { email, resetPasswordKey } = useParams()

  if (email === undefined) return null
  if (resetPasswordKey === undefined) return null

  const navigate = useNavigate()
  const inputRef = useRef<HTMLDivElement>(null)
  const modalRef = useRef<HTMLDivElement>(null)

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
    if (isSuccess) {
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
    }
  }, [isSuccess])

  useUpdateEffect(() => {
    if (isError) {
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
    }
  }, [isError])

  const onSlideModalOutComplete = useCallback(() => {
    navigate('..')
  }, [])

  const onCloseClick = useCallback(() => {
    slideElement({
      element: modalRef.current,
      onSlideElementComplete: () => {
        navigate('..')
      },
    })
  }, [])

  const onSubmit = (e: React.FormEvent): void => {
    e.preventDefault()

    resetPassword({
      password: passwordSignal.value,
      email,
      resetPasswordKey,
    })
  }

  return (
    <FormModal
      modalRef={modalRef}
      width='350px'
      paddingContent='50px 40px 10px 40px'
      headerText='Reset password'
      headerIcon={<MdPassword />}
      buttonText='RESET'
      isButtonDisabled={isButtonDisabledSignal.value}
      isButtonLoading={isPending}
      isButtonSuccess={isSuccess}
      isButtonError={isError}
      onSlideModalOutComplete={onSlideModalOutComplete}
      onSubmit={onSubmit}
      onCloseClick={onCloseClick}
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
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        <Link
          to={`../${route.register}`}
          style={{ textAlign: 'right' }}
          onClick={(e: MouseEvent): void => {
            e.preventDefault()

            slideElement({
              element: modalRef.current,
              onSlideElementComplete: () => {
                navigate(`../${route.register}`)
              },
            })
          }}
        >
          Register
        </Link>
        <Link
          to={`../${route.login}`}
          onClick={(e: MouseEvent): void => {
            e.preventDefault()

            slideElement({
              element: modalRef.current,
              onSlideElementComplete: () => {
                navigate(`../${route.login}`)
              },
            })
          }}
        >
          Log in
        </Link>
      </Box>
    </FormModal>
  )
}
