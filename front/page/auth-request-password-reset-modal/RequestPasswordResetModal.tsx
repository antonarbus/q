import { useRequestPasswordReset } from '@feature/auth/request-password-reset'
import { OpenLoginModalLink } from '@feature/open-close/open-login-modal'
import { Box } from '@mui/material'
import { useSignal } from '@preact/signals-react'
import { FormModal } from '@shared/component/FormModal'
import { EmailField } from '@shared/component/input-field/EmailField'
import { router } from '@shared/lib/react-router-dom/router'
import { useAnimatedElement } from '@shared/util/useAnimatedElement'
import { type JSX, useRef } from 'react'
import { PiPassword } from 'react-icons/pi'

export const RequestPasswordResetModal = (): JSX.Element => {
  const animatedElement = useAnimatedElement()
  const inputRef = useRef<HTMLDivElement>(null)
  const emailSignal = useSignal('')
  const isEmailOkSignal = useSignal(false)

  const requestPasswordReset = useRequestPasswordReset({
    emailSignal,
    slideOut: animatedElement.slideOut,
  })

  const navigateUp = (): void => {
    void router.navigate('..')
  }

  return (
    <FormModal
      buttonText='RESET'
      headerIcon={<PiPassword />}
      headerText='Reset password'
      isButtonDisabled={isEmailOkSignal.value === false}
      isButtonError={requestPasswordReset.isError}
      isButtonLoading={requestPasswordReset.isPending}
      isButtonSuccess={requestPasswordReset.isSuccess}
      modalRef={animatedElement.ref}
      onCloseClick={navigateUp}
      onSubmit={requestPasswordReset.handleSubmit}
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
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row-reverse',
          justifyContent: 'space-between',
        }}
      >
        <OpenLoginModalLink slideOut={animatedElement.slideOut} />
      </Box>
    </FormModal>
  )
}
