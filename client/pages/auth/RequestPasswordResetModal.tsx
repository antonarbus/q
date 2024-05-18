import PasswordRoundedIcon from '@mui/icons-material/PasswordRounded'
import { Box } from '@mui/material'
import { useSignal } from '@preact/signals-react'
import { useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { useUpdateEffect } from 'react-use'
import { OpenLoginModalLink } from '@features/open_close/open_login_modal'
import { useRequestPasswordResetMutation } from '@entities/user'
import { EmailField, FormModal } from '@shared/components'
import { notify } from '@shared/ui/top_msg'
import { slideElement } from '@shared/utils/slideElement'

export const RequestPasswordResetModal = (): JSX.Element => {
  const modalRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLDivElement>(null)
  const navigate = useNavigate()
  const emailSignal = useSignal('')
  const isEmailOkSignal = useSignal(false)

  const { mutate: requestPasswordReset, isPending, data, isSuccess, isError, error } = useRequestPasswordResetMutation()

  useUpdateEffect(() => {
    if (isSuccess) {
      if (data.message === 'reset link sent') {
        notify({ msg: 'Check your mailbox.', theme: 'light' })

        setTimeout(() => {
          slideElement({
            element: modalRef.current,
            onSlideElementComplete: () => {
              navigate('..')
            },
          })
        }, 2500)
      }
    }
  }, [isSuccess])

  useUpdateEffect(() => {
    if (isError) {
      if (error.response?.data.message === 'does not exists') {
        notify({ msg: 'Not found', type: 'info', theme: 'light' })
        return
      }

      if (error.response?.data.message === 'validation error') {
        notify({ msg: 'Validation error', type: 'warn', theme: 'light' })
        return
      }

      notify({ msg: 'Internal error', type: 'error', theme: 'light' })
    }
  }, [isError])

  const onSubmit = (e: React.FormEvent): void => {
    e.preventDefault()

    requestPasswordReset({ email: emailSignal.value })
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
      onSubmit={onSubmit}
      onCloseSlideModalOutAndNavigateUp={true}
    >
      <EmailField
        inputRef={inputRef}
        emailSignal={emailSignal}
        isEmailOkSignal={isEmailOkSignal}
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
