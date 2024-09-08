import { LockOutlined } from '@mui/icons-material'
import { Box } from '@mui/material'
import { useSignal, useSignalEffect } from '@preact/signals-react'
import { useRef } from 'react'
import { useRegister } from '@features/auth/register'
import { OpenLoginModalLink } from '@features/open_close/open_login_modal'
import { ConfirmPasswordField } from '@shared/components/ConfirmPasswordField'
import { EmailField } from '@shared/components/EmailField'
import { FormModal } from '@shared/components/FormModal'
import { PasswordField } from '@shared/components/PasswordField'
import { router } from '@lib_instances/router'

export const RegisterModal = (): JSX.Element => {
  const inputRef = useRef<HTMLDivElement>(null)
  const modalRef = useRef<HTMLDivElement>(null)
  const emailSignal = useSignal('')
  const passwordSignal = useSignal('')
  const isEmailOkSignal = useSignal(false)
  const isConfirmPasswordOkSignal = useSignal(false)
  const isButtonDisabledSignal = useSignal(false)
  const { onSubmit, isSuccess, isPending, isError } = useRegister({
    emailSignal,
    passwordSignal,
    modalRef,
  })

  useSignalEffect(() => {
    isButtonDisabledSignal.value = !(
      isEmailOkSignal.value && isConfirmPasswordOkSignal.value
    )
  })

  return (
    <FormModal
      modalRef={modalRef}
      width='350px'
      paddingContent='50px 40px 10px 40px'
      headerText='Register'
      headerIcon={<LockOutlined />}
      buttonText='REGISTER'
      isButtonDisabled={isButtonDisabledSignal.value}
      isButtonLoading={isPending}
      isButtonSuccess={isSuccess}
      isButtonError={isError}
      shouldUnmountOnClickAway
      shouldUnmountOnEsc
      onUnmount={() => {
        void router.navigate('..')
      }}
      onCloseClick={() => {
        void router.navigate('..')
      }}
      onSubmit={onSubmit}
    >
      <EmailField
        inputRef={inputRef}
        emailSignal={emailSignal}
        isEmailOkSignal={isEmailOkSignal}
        autoFocus
      />
      <PasswordField passwordSignal={passwordSignal} />
      <ConfirmPasswordField
        originalPasswordSignal={passwordSignal}
        isConfirmPasswordOkSignal={isConfirmPasswordOkSignal}
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
