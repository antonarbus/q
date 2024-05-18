import { dispatch } from '@lib_instances/store'
import { Box } from '@mui/material'
import { useSignal, useSignalEffect } from '@preact/signals-react'
import { useRef } from 'react'
import { MdPassword } from 'react-icons/md'
import { useParams } from 'react-router-dom'
import { useUpdateEffect } from 'react-use'
import { OpenLoginModalLink } from '@features/open_close/open_login_modal'
import { OpenRegisterModalLink } from '@features/open_close/open_register_modal'
import { useResetPasswordMutation, userSlice } from '@entities/user'
import { accessTokenSignal } from '@shared/auth/accessTokenSignal'
import { ConfirmPasswordField, EmailField, FormModal, PasswordField } from '@shared/components'
import { navItemId } from '@shared/consts/navItemId'
import { navSlice } from '@shared/nav'
import { notify } from '@shared/ui/top_msg'

export const ResetPasswordModal = (): React.ReactNode => {
  const { email, resetPasswordKey } = useParams()

  if (email === undefined) return null
  if (resetPasswordKey === undefined) return null

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
      onSubmit={onSubmit}
      onCloseSlideModalOutAndNavigateUp={true}
    >
      <EmailField
        disabled
        inputRef={inputRef}
        emailSignal={emailSignal}
        isEmailOkSignal={isEmailOkSignal}
      />
      <PasswordField
        passwordSignal={passwordSignal}
      />
      <ConfirmPasswordField
        originalPasswordSignal={passwordSignal}
        isConfirmPasswordOkSignal={isConfirmPasswordOkSignal}
      />
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        <OpenRegisterModalLink modalRef={modalRef} />
        <OpenLoginModalLink modalRef={modalRef} />
      </Box>
    </FormModal>
  )
}
