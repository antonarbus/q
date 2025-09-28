import { FiLogIn } from 'react-icons/fi'
import { Box } from '@mui/material'
import { useSignal } from '@preact/signals-react'
import { useRef } from 'react'
import type { JSX } from 'react'
import { useLogIn } from '@features/auth/log-in'
import { OpenRegisterModalLink } from '@features/open-close/open-register-modal'
import { OpenResetModalLink } from '@features/open-close/open-reset-modal'
import { EmailField } from '@shared/component/input-field/EmailField'
import { FormModal } from '@shared/component/FormModal'
import { PasswordField } from '@shared/component/input-field/PasswordField'
import { router } from '@shared/lib/react-router-dom'
import { useSlide } from '@shared/util/useSlide'

export const LoginModal = (): JSX.Element => {
  const { ref: modalRef, slideOut } = useSlide()
  const inputRef = useRef<HTMLDivElement>(null)
  const emailSignal = useSignal('')
  const passwordSignal = useSignal('')
  const isEmailOkSignal = useSignal(false)

  const { isPending, isSuccess, isError, onSubmit } = useLogIn({
    emailSignal,
    passwordSignal,
    slideOut,
  })

  const isButtonDisabled =
    isEmailOkSignal.value === false || passwordSignal.value === '' || isPending

  const navigateUp = (): void => {
    void router.navigate('..')
  }

  return (
    <FormModal
      buttonText='LOG IN'
      headerIcon={<FiLogIn />}
      headerText='Log in'
      isButtonDisabled={isButtonDisabled}
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
      <PasswordField passwordSignal={passwordSignal} />
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        <OpenResetModalLink slideOut={slideOut} />
        <OpenRegisterModalLink slideOut={slideOut} />
      </Box>
    </FormModal>
  )
}
