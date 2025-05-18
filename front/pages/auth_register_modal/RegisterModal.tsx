import { MdLockOutline } from 'react-icons/md'
import { Box } from '@mui/material'
import { useSignal, useSignalEffect } from '@preact/signals-react'
import { useRef } from 'react'
import { useRegister } from '@features/auth/register'
import { OpenLoginModalLink } from '@features/open_close/open_login_modal'
import { ConfirmPasswordField } from '@shared/components/ConfirmPasswordField'
import { EmailField } from '@shared/components/input_fields/EmailField'
import { FormModal } from '@shared/components/FormModal'
import { PasswordField } from '@shared/components/input_fields/PasswordField'
import { router } from '@shared/lib/router'
import { useSlide } from '@shared/utils/useSlide'

export const RegisterModal = (): React.JSX.Element => {
  const { ref: modalRef, slideOut } = useSlide()
  const inputRef = useRef<HTMLDivElement>(null)
  const emailSignal = useSignal('')
  const passwordSignal = useSignal('')
  const isEmailOkSignal = useSignal(false)
  const isConfirmPasswordOkSignal = useSignal(false)
  const isButtonDisabledSignal = useSignal(false)

  const { onSubmit, isSuccess, isPending, isError } = useRegister({
    emailSignal,
    passwordSignal,
    slideOut,
  })

  useSignalEffect(() => {
    isButtonDisabledSignal.value =
      (isEmailOkSignal.value && isConfirmPasswordOkSignal.value) === false
  })

  const navigateUp = (): void => {
    void router.navigate('..')
  }

  return (
    <FormModal
      buttonText='REGISTER'
      headerIcon={<MdLockOutline />}
      headerText='Register'
      isButtonDisabled={isButtonDisabledSignal.value}
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
      <ConfirmPasswordField
        isConfirmPasswordOkSignal={isConfirmPasswordOkSignal}
        originalPasswordSignal={passwordSignal}
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
