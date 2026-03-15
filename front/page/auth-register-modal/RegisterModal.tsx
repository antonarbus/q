/* eslint-disable @typescript-eslint/no-unsafe-type-assertion */
import { useRegister } from '@feature/auth/register-user/useRegister'
import { OpenLoginModalLink } from '@feature/open-close/open-login-modal'
import { Box } from '@mui/material'
import { useSignal, useSignalEffect } from '@preact/signals-react'
import { ConfirmPasswordField } from '@shared/component/ConfirmPasswordField'
import { FormModal } from '@shared/component/FormModal'
import { EmailField } from '@shared/component/input-field/EmailField'
import { PasswordField } from '@shared/component/input-field/PasswordField'
import { router } from '@shared/lib/react-router-dom/router'
import { type Location, useLocation } from 'react-router-dom'
import { useAnimatedElement } from '@shared/util/useAnimatedElement'
import { useRef } from 'react'
import { MdLockOutline } from 'react-icons/md'

export const RegisterModal = (): React.JSX.Element => {
  const animatedElement = useAnimatedElement()
  const inputRef = useRef<HTMLDivElement>(null)

  const location = useLocation() as Location<{
    prefilledEmail: string
  } | null>

  const emailSignal = useSignal(location.state?.prefilledEmail ?? '')
  const passwordSignal = useSignal('')
  const isEmailOkSignal = useSignal(false)
  const isConfirmPasswordOkSignal = useSignal(false)
  const isButtonDisabledSignal = useSignal(false)

  const register = useRegister({
    emailSignal,
    passwordSignal,
    slideOut: animatedElement.slideOut,
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
      isButtonError={register.isError}
      isButtonLoading={register.isPending}
      isButtonSuccess={register.isSuccess}
      modalRef={animatedElement.ref}
      onCloseClick={navigateUp}
      onSubmit={register.handleSubmit}
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
        <OpenLoginModalLink slideOut={animatedElement.slideOut} />
      </Box>
    </FormModal>
  )
}
