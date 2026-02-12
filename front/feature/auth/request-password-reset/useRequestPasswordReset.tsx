import { useRequestUserPasswordResetMutation } from '@entity/user/api/useRequestUserPasswordResetMutation'
import type { Signal } from '@preact/signals-react'
import { asyncDelay } from '@shared/util/asyncDelay'
import type { UseMutationResult } from '@tanstack/react-query'
import type { SubmitEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { useUpdateEffect } from 'react-use'
import { toast } from 'sonner'

type Props = {
  emailSignal: Signal<string>
  slideOut: () => Promise<void>
}

type Res = {
  handleSubmit: (e: SubmitEvent) => void
  isPending: UseMutationResult['isPending']
  isSuccess: UseMutationResult['isSuccess']
  isError: UseMutationResult['isError']
}

export const useRequestPasswordReset = (props: Props): Res => {
  const navigate = useNavigate()

  const requestUserPasswordResetMutation = useRequestUserPasswordResetMutation()

  useUpdateEffect(() => {
    if (requestUserPasswordResetMutation.isSuccess === true) {
      toast.info('Check your inbox or spam')

      const slideOutAndChangeUrl = async (): Promise<void> => {
        await asyncDelay(1000)
        await props.slideOut()
        void navigate('..')
      }

      void slideOutAndChangeUrl()
    }
  }, [requestUserPasswordResetMutation.isSuccess])

  useUpdateEffect(() => {
    if (requestUserPasswordResetMutation.isError === true) {
      if (
        requestUserPasswordResetMutation.error.response?.data.errorCode ===
        'USER_NOT_FOUND'
      ) {
        toast.info('User not found')

        return
      }

      if (
        requestUserPasswordResetMutation.error.response?.data.errorCode ===
        'ACCOUNT_NOT_ACTIVATED'
      ) {
        toast.warning('Account not activated')

        return
      }

      if (
        requestUserPasswordResetMutation.error.response?.data.errorCode ===
        'RESET_LINK_NOT_SENT'
      ) {
        toast.warning('Something happened, failed to send the mail')

        return
      }

      if (
        requestUserPasswordResetMutation.error.response?.data.errorCode ===
        'RESET_KEY_NOT_ISSUED'
      ) {
        toast.warning('Something happened, failed to generate reset link')

        return
      }

      toast.error('Internal error')
    }
  }, [requestUserPasswordResetMutation.isError])

  const handleSubmit = (event: SubmitEvent): void => {
    event.preventDefault()

    requestUserPasswordResetMutation.mutate({ email: props.emailSignal.value })
  }

  return {
    handleSubmit,
    isPending: requestUserPasswordResetMutation.isPending,
    isSuccess: requestUserPasswordResetMutation.isSuccess,
    isError: requestUserPasswordResetMutation.isError,
  }
}
