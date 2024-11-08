import PasswordRoundedIcon from '@mui/icons-material/PasswordRounded'
import { Box } from '@mui/material'
import { useSignal } from '@preact/signals-react'
import { useRef } from 'react'
import { useRequestPasswordReset } from '@features/auth/request_password_reset'
import { OpenLoginModalLink } from '@features/open_close/open_login_modal'
import { EmailField } from '@shared/components/input_fields/EmailField'
import { FormModal } from '@shared/components/FormModal'
import { router } from '@shared/lib/router'

export const RequestPasswordResetModal = (): React.JSX.Element => {
  const modalRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLDivElement>(null)
  const emailSignal = useSignal('')
  const isEmailOkSignal = useSignal(false)

  const { onSubmit, isPending, isSuccess, isError } = useRequestPasswordReset({
    emailSignal,
    modalRef,
  })

  const navigateUp = (): void => {
    void router.navigate('..')
  }

  return (
    <FormModal
      modalRef={modalRef}
      width='350px'
      paddingContent='50px 40px 10px 40px'
      headerText='Reset password'
      headerIcon={<PasswordRoundedIcon />}
      buttonText='RESET'
      isButtonDisabled={!isEmailOkSignal.value}
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
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row-reverse',
          justifyContent: 'space-between',
        }}
      >
        <OpenLoginModalLink modalRef={modalRef} />
      </Box>
    </FormModal>
  )
}
