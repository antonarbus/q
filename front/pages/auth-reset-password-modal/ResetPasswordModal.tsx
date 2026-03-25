import { useResetPassword } from '@front/features/auth/reset-password/useResetPassword'
import { OpenLoginModalLink } from '@front/features/open-close/open-login-modal'
import { OpenRegisterModalLink } from '@front/features/open-close/open-register-modal'
import { Box } from '@mui/material'
import { useSignal, useSignalEffect } from '@preact/signals-react'
import { ConfirmPasswordField } from '@front/shared/component/ConfirmPasswordField'
import { FormModal } from '@front/shared/component/FormModal'
import { EmailField } from '@front/shared/component/input-field/EmailField'
import { PasswordField } from '@front/shared/component/input-field/PasswordField'
import { routerHolder } from '@front/shared/lib/react-router-dom/router'
import { useAnimatedElement } from '@front/shared/util/useAnimatedElement'
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
    void routerHolder.router.navigate('..')
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
          prefilledEmail={emailSignal.value}
        />
        <OpenLoginModalLink slideOut={animatedElement.slideOut} />
      </Box>
    </FormModal>
  )
}
