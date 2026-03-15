/* eslint-disable @typescript-eslint/no-unsafe-type-assertion */
import { useRequestPasswordReset } from '@feature/auth/request-password-reset/useRequestPasswordReset'
import { OpenLoginModalLink } from '@feature/open-close/open-login-modal'
import { Box } from '@mui/material'
import { useSignal } from '@preact/signals-react'
import { FormModal } from '@shared/component/FormModal'
import { EmailField } from '@shared/component/input-field/EmailField'
import { router } from '@shared/lib/react-router-dom/router'
import { type Location, useLocation } from 'react-router-dom'
import { useAnimatedElement } from '@shared/util/useAnimatedElement'
import { useRef } from 'react'
import { PiPassword } from 'react-icons/pi'

export const RequestPasswordResetModal = (): React.JSX.Element => {
  const animatedElement = useAnimatedElement()
  const inputRef = useRef<HTMLDivElement>(null)

  const location = useLocation() as Location<{
    prefilledEmail: string
  } | null>

  const emailSignal = useSignal(location.state?.prefilledEmail ?? '')
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
