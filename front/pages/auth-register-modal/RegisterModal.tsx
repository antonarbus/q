import { useRegister } from '@front/features/auth/register-user/useRegister'
import { OpenLoginModalLink } from '@front/features/open-close/open-login-modal'
import { Box } from '@mui/material'
import { useSignal, useSignalEffect } from '@preact/signals-react'
import { ConfirmPasswordField } from '@front/shared/component/ConfirmPasswordField'
import { FormModal } from '@front/shared/component/FormModal'
import { EmailField } from '@front/shared/component/input-field/EmailField'
import { PasswordField } from '@front/shared/component/input-field/PasswordField'
import { getSearchParam } from '@front/shared/lib/react-router-dom/searchParams'
import { routerHolder } from '@front/shared/lib/react-router-dom/routerHolder'
import { useAnimatedElement } from '@front/shared/util/useAnimatedElement'
import { useRef } from 'react'
import { MdLockOutline } from 'react-icons/md'

export const RegisterModal = (): React.JSX.Element => {
  const animatedElement = useAnimatedElement()
  const inputRef = useRef<HTMLDivElement>(null)
  const prefilledEmail = getSearchParam('prefilledEmail') ?? ''
  const emailSignal = useSignal(prefilledEmail)
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
      onCloseClick={(): void => {
        routerHolder.router.navigate('..')
      }}
      onSubmit={register.handleSubmit}
      onUnmount={(): void => {
        routerHolder.router.navigate('..')
      }}
      paddingContent='50px 40px 10px 40px'
      shouldUnmountOnClickAway={true}
      shouldUnmountOnEsc={true}
      width='350px'
    >
      <EmailField
        autoFocus={true}
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
