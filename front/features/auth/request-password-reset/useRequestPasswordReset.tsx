import { useRequestUserPasswordResetMutation } from '@entities/user'
import type { Signal } from '@preact/signals-react'
import { asyncDelay } from '@shared/util/delay'
import type { UseMutationResult } from '@tanstack/react-query'
import type { FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { useUpdateEffect } from 'react-use'
import { toast } from 'sonner'

type Props = {
  emailSignal: Signal<string>
  slideOut: () => Promise<void>
}

type Res = {
  onSubmit: (e: FormEvent) => void
  isPending: UseMutationResult['isPending']
  isSuccess: UseMutationResult['isSuccess']
  isError: UseMutationResult['isError']
}

export const useRequestPasswordReset = ({
  emailSignal,
  slideOut,
}: Props): Res => {
  const navigate = useNavigate()

  const requestUserPasswordResetMutation = useRequestUserPasswordResetMutation()

  useUpdateEffect(() => {
    if (requestUserPasswordResetMutation.isSuccess === true) {
      if (requestUserPasswordResetMutation.data.message === 'reset link sent') {
        toast.info('Check your inbox or spam')

        const slideOutAndChangeUrl = async (): Promise<void> => {
          await asyncDelay(1000)
          await slideOut()
          void navigate('..')
        }

        void slideOutAndChangeUrl()
      }
    }
  }, [requestUserPasswordResetMutation.isSuccess])

  useUpdateEffect(() => {
    if (requestUserPasswordResetMutation.isError === true) {
      if (
        requestUserPasswordResetMutation.error.response?.data.message ===
        'does not exists'
      ) {
        toast.info('User not found')

        return
      }

      if (
        requestUserPasswordResetMutation.error.response?.data.message ===
        'account not activated'
      ) {
        toast.warning('Account not activated')

        return
      }

      if (
        requestUserPasswordResetMutation.error.response?.data.message ===
        'reset link not sent'
      ) {
        toast.warning('Something happened, failed to send the mail')

        return
      }

      if (
        requestUserPasswordResetMutation.error.response?.data.message ===
        'reset key not issued'
      ) {
        toast.warning('Something happened, failed to generate reset link')

        return
      }

      toast.error('Internal error')
    }
  }, [requestUserPasswordResetMutation.isError])

  const onSubmit = (event: FormEvent): void => {
    event.preventDefault()

    requestUserPasswordResetMutation.mutate({ email: emailSignal.value })
  }

  return {
    onSubmit,
    isPending: requestUserPasswordResetMutation.isPending,
    isSuccess: requestUserPasswordResetMutation.isSuccess,
    isError: requestUserPasswordResetMutation.isError,
  }
}
