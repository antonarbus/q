import { useResetPassword } from '@feature/auth/reset-password'
import { OpenLoginModalLink } from '@feature/open-close/open-login-modal'
import { OpenRegisterModalLink } from '@feature/open-close/open-register-modal'
import { Box } from '@mui/material'
import { useSignal, useSignalEffect } from '@preact/signals-react'
import { ConfirmPasswordField } from '@shared/component/ConfirmPasswordField'
import { FormModal } from '@shared/component/FormModal'
import { EmailField } from '@shared/component/input-field/EmailField'
import { PasswordField } from '@shared/component/input-field/PasswordField'
import { router } from '@shared/lib/react-router-dom/router'
import { useAnimatedElement } from '@shared/util/useAnimatedElement'
import { useRef } from 'react'
import { MdPassword } from 'react-icons/md'
import { useParams } from 'react-router-dom'

export const ResetPasswordModal = (): React.ReactNode => {
  const animatedElement = useAnimatedElement()
  const urlParams = useParams()
  const inputRef = useRef<HTMLDivElement>(null)
  const emailSignal = useSignal(urlParams.email ?? 'email is missing')
  const passwordSignal = useSignal('')
  const isEmailOkSignal = useSignal(true)
  const isConfirmPasswordOkSignal = useSignal(false)
  const isButtonDisabledSignal = useSignal(false)

  const resetPassword = useResetPassword({
    passwordSignal,
    modalRef: animatedElement.ref,
    slideOut: animatedElement.slideOut,
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
      isButtonError={resetPassword.isError}
      isButtonLoading={resetPassword.isPending}
      isButtonSuccess={resetPassword.isSuccess}
      modalRef={animatedElement.ref}
      onCloseClick={navigateUp}
      onSubmit={resetPassword.handleSubmit}
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
      <PasswordField autoFocus passwordSignal={passwordSignal} />
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
        <OpenRegisterModalLink
          slideOut={animatedElement.slideOut}
          prefilledEmail=''
        />
        <OpenLoginModalLink slideOut={animatedElement.slideOut} />
      </Box>
    </FormModal>
  )
}
