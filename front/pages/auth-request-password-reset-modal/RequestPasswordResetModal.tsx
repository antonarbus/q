import { useRequestPasswordReset } from '@front/features/auth/request-password-reset/useRequestPasswordReset'
import { OpenLoginModalLink } from '@front/features/open-close/open-login-modal'
import { Box } from '@mui/material'
import { useSignal } from '@preact/signals-react'
import { FormModal } from '@front/shared/component/FormModal'
import { EmailField } from '@front/shared/component/input-field/EmailField'
import { getSearchParam } from '@front/shared/lib/react-router-dom/searchParams'
import { routerHolder } from '@front/shared/lib/react-router-dom/routerHolder'
import { useAnimatedElement } from '@front/shared/util/useAnimatedElement'
import { useRef } from 'react'
import { PiPassword } from 'react-icons/pi'

export const RequestPasswordResetModal = (): React.JSX.Element => {
  const animatedElement = useAnimatedElement()
  const inputRef = useRef<HTMLDivElement>(null)
  const prefilledEmail = getSearchParam('prefilledEmail') ?? ''
  const emailSignal = useSignal(prefilledEmail)
  const isEmailOkSignal = useSignal(false)

  const requestPasswordReset = useRequestPasswordReset({
    emailSignal,
    slideOut: animatedElement.slideOut,
  })

  const navigateUp = (): void => {
    routerHolder.router.navigate('..')
  }

  return (
    <FormModal
      buttonText='RESET'
      headerIcon={<PiPassword />}
      headerText='Reset password'
      isButtonDisabled={isEmailOkSignal.value === false}
      isButtonError={requestPasswordReset.isError}
      isButtonLoading={requestPasswordReset.isPending}
      isButtonSuccess={requestPasswordReset.isSuccess}
      modalRef={animatedElement.ref}
      onCloseClick={navigateUp}
      onSubmit={requestPasswordReset.handleSubmit}
      onUnmount={navigateUp}
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
