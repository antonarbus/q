import { FiLogIn } from 'react-icons/fi'
import { Box } from '@mui/material'
import { useSignal } from '@preact/signals-react'
import { useRef } from 'react'
import { useLogIn } from '@features/auth/log_in'
import { OpenRegisterModalLink } from '@features/open_close/open_register_modal'
import { OpenResetModalLink } from '@features/open_close/open_reset_modal'
import { EmailField } from '@shared/components/input_fields/EmailField'
import { FormModal } from '@shared/components/FormModal'
import { PasswordField } from '@shared/components/input_fields/PasswordField'
import { router } from '@shared/lib/router'
import { useSlide } from '@shared/utils/useSlide'

export const LoginModal = (): React.JSX.Element => {
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
      modalRef={modalRef}
      width='350px'
      paddingContent='50px 40px 10px 40px'
      headerText='Log in'
      headerIcon={<FiLogIn />}
      buttonText='LOG IN'
      isButtonDisabled={isButtonDisabled}
      isButtonLoading={isPending}
      isButtonSuccess={isSuccess}
      isButtonError={isError}
      shouldUnmountOnClickAway
      shouldUnmountOnEsc
      onUnmount={navigateUp}
      onCloseClick={navigateUp}
      onSubmit={onSubmit}
    >
      <EmailField
        inputRef={inputRef}
        emailSignal={emailSignal}
        isEmailOkSignal={isEmailOkSignal}
        autoFocus
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
