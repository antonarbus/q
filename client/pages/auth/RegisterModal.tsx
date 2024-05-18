import { LockOutlined } from '@mui/icons-material'
import { Box } from '@mui/material'
import { useSignal, useSignalEffect } from '@preact/signals-react'
import { useRef } from 'react'
import { useRegisterUser } from '@features/auth/register_user'
import { OpenLoginModalLink } from '@features/open_close/open_login_modal'
import { ConfirmPasswordField, EmailField, FormModal, PasswordField } from '@shared/components'

export const RegisterModal = (): JSX.Element => {
  const inputRef = useRef<HTMLDivElement>(null)
  const modalRef = useRef<HTMLDivElement>(null)
  const emailSignal = useSignal('')
  const passwordSignal = useSignal('')
  const isEmailOkSignal = useSignal(false)
  const isConfirmPasswordOkSignal = useSignal(false)
  const isButtonDisabledSignal = useSignal(false)
  const { onSubmit, isSuccess, isPending, isError } = useRegisterUser({ emailSignal, passwordSignal })

  useSignalEffect(() => {
    isButtonDisabledSignal.value = !(isEmailOkSignal.value && isConfirmPasswordOkSignal.value)
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
      onSubmit={onSubmit}
      onCloseSlideModalOutAndNavigateUp={true}
    >
      <EmailField
        inputRef={inputRef}
        emailSignal={emailSignal}
        isEmailOkSignal={isEmailOkSignal}
      />
      <PasswordField
        passwordSignal={passwordSignal}
      />
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
