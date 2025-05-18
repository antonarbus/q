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
