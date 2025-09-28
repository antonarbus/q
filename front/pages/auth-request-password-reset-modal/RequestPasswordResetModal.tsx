import { PiPassword } from 'react-icons/pi'
import { Box } from '@mui/material'
import { useSignal } from '@preact/signals-react'
import { useRef, type JSX } from 'react'
import { useRequestPasswordReset } from '@features/auth/request-password-reset'
import { OpenLoginModalLink } from '@features/open-close/open-login-modal'
import { EmailField } from '@shared/component/input-field/EmailField'
import { FormModal } from '@shared/component/FormModal'
import { router } from '@shared/lib/react-router-dom'
import { useSlide } from '@shared/util/useSlide'

export const RequestPasswordResetModal = (): JSX.Element => {
  const { ref: modalRef, slideOut } = useSlide()
  const inputRef = useRef<HTMLDivElement>(null)
  const emailSignal = useSignal('')
  const isEmailOkSignal = useSignal(false)

  const { onSubmit, isPending, isSuccess, isError } = useRequestPasswordReset({
    emailSignal,
    slideOut,
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
        <OpenLoginModalLink slideOut={slideOut} />
      </Box>
    </FormModal>
  )
}
