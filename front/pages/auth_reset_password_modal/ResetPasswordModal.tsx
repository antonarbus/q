import { Box } from '@mui/material'
import { useSignal, useSignalEffect } from '@preact/signals-react'
import { useRef } from 'react'
import { MdPassword } from 'react-icons/md'
import { useParams } from 'react-router-dom'
import { useResetPassword } from '@features/auth/reset_password'
import { OpenLoginModalLink } from '@features/open_close/open_login_modal'
import { OpenRegisterModalLink } from '@features/open_close/open_register_modal'
import { ConfirmPasswordField } from '@shared/components/ConfirmPasswordField'
import { EmailField } from '@shared/components/input_fields/EmailField'
import { FormModal } from '@shared/components/FormModal'
import { PasswordField } from '@shared/components/input_fields/PasswordField'
import { router } from '@shared/lib/router'
import { useSlide } from '@shared/utils/useSlide'

export const ResetPasswordModal = (): React.ReactNode => {
  const { ref: modalRef, slideOut } = useSlide()
  const { email } = useParams()
  const inputRef = useRef<HTMLDivElement>(null)
  const emailSignal = useSignal(email ?? 'email is missing')
  const passwordSignal = useSignal('')
  const isEmailOkSignal = useSignal(true)
  const isConfirmPasswordOkSignal = useSignal(false)
  const isButtonDisabledSignal = useSignal(false)

  const { onSubmit, isPending, isSuccess, isError } = useResetPassword({
    passwordSignal,
    modalRef,
    slideOut,
  })

  useSignalEffect(() => {
    isButtonDisabledSignal.value = isConfirmPasswordOkSignal.value === false
  })

  const navigateUp = (): void => {
    void router.navigate('..')
  }

  return (
    <FormModal
      buttonText='RESET'
      headerIcon={<MdPassword />}
      headerText='Reset password'
      isButtonDisabled={isButtonDisabledSignal.value}
      isButtonError={isError}
      isButtonLoading={isPending}
      isButtonSuccess={isSuccess}
      modalRef={modalRef}
      onCloseClick={navigateUp}
      onSubmit={onSubmit}
      onUnmount={navigateUp}
      paddingContent='50px 40px 10px 40px'
      shouldUnmountOnClickAway
      shouldUnmountOnEsc
      width='350px'
    >
      <EmailField
        disabled
        emailSignal={emailSignal}
        inputRef={inputRef}
        isEmailOkSignal={isEmailOkSignal}
      />
      <PasswordField
        autoFocus
        passwordSignal={passwordSignal}
      />
      <ConfirmPasswordField
        isConfirmPasswordOkSignal={isConfirmPasswordOkSignal}
        originalPasswordSignal={passwordSignal}
      />
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        <OpenRegisterModalLink slideOut={slideOut} />
        <OpenLoginModalLink slideOut={slideOut} />
      </Box>
    </FormModal>
  )
}
