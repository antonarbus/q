import { LockOutlined } from '@mui/icons-material'
import { Box } from '@mui/material'
import { useSignal, useSignalEffect } from '@preact/signals-react'
import { useCallback, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { useUpdateEffect } from 'react-use'
import { OpenLoginModalLink } from '@features/open_close/open_login_modal'
import { useRegisterMutation } from '@entities/user'
import { ConfirmPasswordField, EmailField, FormModal, PasswordField } from '@shared/components'
import { notify } from '@shared/ui/top_msg'
import { slideElement } from '@shared/utils/slideElement'

export const RegisterModal = (): JSX.Element => {
  const navigate = useNavigate()
  const inputRef = useRef<HTMLDivElement>(null)
  const modalRef = useRef<HTMLDivElement>(null)

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
    if (isSuccess) {
      if (data.message === 'activation link sent') {
        notify({ msg: 'Check your mailbox.', theme: 'light' })
      }
    }
  }, [isSuccess])

  useUpdateEffect(() => {
    if (isError) {
      if (error.response?.data.message === 'already exists') {
        notify({ msg: 'Already exists', type: 'info', theme: 'light' })
        return
      }

      if (error.response?.data.message === 'validation error') {
        notify({ msg: 'Validation error', type: 'warn', theme: 'light' })
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

    register({
      email: emailSignal.value,
      password: passwordSignal.value,
    })
  }

  return (
    <FormModal
      modalRef={modalRef}
      width='350px'
      paddingContent='50px 40px 10px 40px'
      headerText='Register'
      headerIcon={<LockOutlined />}
      buttonText='REGISTER'
      isButtonDisabled={isButtonDisabledSignal.value}
      isButtonLoading={isPending}
      isButtonSuccess={isSuccess}
      isButtonError={isError}
      onSlideModalOutComplete={onSlideModalOutComplete}
      onSubmit={onSubmit}
      onCloseClick={onCloseClick}
    >
      <EmailField
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
          flexDirection: 'row-reverse',
          justifyContent: 'space-between',
        }}
      >
        <OpenLoginModalLink modalRef={modalRef} />
      </Box>
    </FormModal>
  )
}
