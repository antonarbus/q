import { LoginRounded } from '@mui/icons-material'
import { Box } from '@mui/material'
import { useSignal } from '@preact/signals-react'
import { useRef } from 'react'
import { useLogIn } from '@features/auth/log_in'
import { OpenRegisterModalLink } from '@features/open_close/open_register_modal'
import { OpenResetModalLink } from '@features/open_close/open_reset_modal'
import { EmailField, FormModal, PasswordField } from '@shared/components'

export const LoginModal = (): JSX.Element => {
  const inputRef = useRef<HTMLDivElement>(null)
  const modalRef = useRef<HTMLDivElement>(null)
  const emailSignal = useSignal('')
  const passwordSignal = useSignal('')
  const isEmailOkSignal = useSignal(false)
  const { isPending, isSuccess, isError, onSubmit } = useLogIn({
    emailSignal,
    passwordSignal,
    modalRef,
  })

  return (
    <FormModal
      modalRef={modalRef}
      width='350px'
      paddingContent='50px 40px 10px 40px'
      headerText='Log in'
      headerIcon={<LoginRounded />}
      buttonText='LOG IN'
      isButtonDisabled={
        !isEmailOkSignal.value || passwordSignal.value === '' || isPending
      }
      isButtonLoading={isPending}
      isButtonSuccess={isSuccess}
      isButtonError={isError}
      onSubmit={onSubmit}
      onCloseSlideModalOutAndNavigateUp={true}
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
        <OpenResetModalLink modalRef={modalRef} />
        <OpenRegisterModalLink modalRef={modalRef} />
      </Box>
    </FormModal>
  )
}
