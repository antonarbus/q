import { Box } from '@mui/material'
import { useSignal, useSignalEffect } from '@preact/signals-react'
import { useRef } from 'react'
import { MdPassword } from 'react-icons/md'
import { useParams } from 'react-router-dom'
import { useResetPassword } from '@features/auth/reset_password'
import { OpenLoginModalLink } from '@features/open_close/open_login_modal'
import { OpenRegisterModalLink } from '@features/open_close/open_register_modal'
import { ConfirmPasswordField } from '@shared/components/ConfirmPasswordField'
import { EmailField } from '@shared/components/EmailField'
import { FormModal } from '@shared/components/FormModal'
import { PasswordField } from '@shared/components/PasswordField'
import { router } from '@lib_instances/router'

export const ResetPasswordModal = (): React.ReactNode => {
  const { email } = useParams()

  const inputRef = useRef<HTMLDivElement>(null)
  const modalRef = useRef<HTMLDivElement>(null)

  const emailSignal = useSignal(email ?? 'email is missing')
  const passwordSignal = useSignal('')
  const isEmailOkSignal = useSignal(true)
  const isConfirmPasswordOkSignal = useSignal(false)
  const isButtonDisabledSignal = useSignal(false)

  const { onSubmit, isPending, isSuccess, isError } = useResetPassword({
    passwordSignal,
    modalRef,
  })

  useSignalEffect(() => {
    isButtonDisabledSignal.value = !isConfirmPasswordOkSignal.value
  })

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
      shouldUnmountOnClickAway
      shouldUnmountOnEsc
      onUnmount={() => {
        void router.navigate('..')
      }}
      onCloseClick={() => {
        void router.navigate('..')
      }}
      onSubmit={onSubmit}
    >
      <EmailField
        disabled
        inputRef={inputRef}
        emailSignal={emailSignal}
        isEmailOkSignal={isEmailOkSignal}
      />
      <PasswordField
        passwordSignal={passwordSignal}
        autoFocus
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
