import { useLogIn } from '@features/auth/log-in'
import { OpenRegisterModalLink } from '@features/open-close/open-register-modal'
import { OpenResetModalLink } from '@features/open-close/open-reset-modal'
import { Box } from '@mui/material'
import { useSignal } from '@preact/signals-react'
import { FormModal } from '@shared/component/FormModal'
import { EmailField } from '@shared/component/input-field/EmailField'
import { PasswordField } from '@shared/component/input-field/PasswordField'
import { router } from '@shared/lib/react-router-dom/router'
import { useAnimatedElement } from '@shared/util/useAnimatedElement'
import { type JSX, useRef } from 'react'
import { FiLogIn } from 'react-icons/fi'

export const LoginModal = (): JSX.Element => {
  const animatedElement = useAnimatedElement()
  const inputRef = useRef<HTMLDivElement>(null)
  const emailSignal = useSignal('')
  const passwordSignal = useSignal('')
  const isEmailOkSignal = useSignal(false)

  const logIn = useLogIn({
    emailSignal,
    passwordSignal,
    slideOut: animatedElement.slideOut,
  })

  const isButtonDisabled =
    isEmailOkSignal.value === false ||
    passwordSignal.value === '' ||
    logIn.isPending

  const navigateUp = (): void => {
    void router.navigate('..')
  }

  return (
    <FormModal
      buttonText='LOG IN'
      headerIcon={<FiLogIn />}
      headerText='Log in'
      isButtonDisabled={isButtonDisabled}
      isButtonError={logIn.isError}
      isButtonLoading={logIn.isPending}
      isButtonSuccess={logIn.isSuccess}
      modalRef={animatedElement.ref}
      onCloseClick={navigateUp}
      onSubmit={logIn.handleSubmit}
      onUnmount={navigateUp}
      paddingContent='50px 40px 10px 40px'
      shouldUnmountOnClickAway
      shouldUnmountOnEsc
      width='350px'
    >
      <EmailField
        autoFocus
        emailSignal={emailSignal}
        inputRef={inputRef}
        isEmailOkSignal={isEmailOkSignal}
      />
      <PasswordField passwordSignal={passwordSignal} />
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        <OpenResetModalLink slideOut={animatedElement.slideOut} />
        <OpenRegisterModalLink slideOut={animatedElement.slideOut} />
      </Box>
    </FormModal>
  )
}
