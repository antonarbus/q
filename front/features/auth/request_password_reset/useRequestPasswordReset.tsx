import type { Signal } from '@preact/signals-react'
import type { UseMutationResult } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { useUpdateEffect } from 'react-use'
import { useRequestPasswordResetMutation } from '@entities/user'
import { toast } from 'sonner'
import { asyncDelay } from '@shared/utils/delay'

type Props = {
  emailSignal: Signal<string>
  slideOut: () => Promise<void>
}

type Res = {
  onSubmit: (e: React.FormEvent) => void
  isPending: UseMutationResult['isPending']
  isSuccess: UseMutationResult['isSuccess']
  isError: UseMutationResult['isError']
}

export const useRequestPasswordReset = ({
  emailSignal,
  slideOut,
}: Props): Res => {
  const navigate = useNavigate()

  const {
    mutate: requestPasswordReset,
    isPending,
    data,
    isSuccess,
    isError,
    error,
  } = useRequestPasswordResetMutation()

  useUpdateEffect(() => {
    if (isSuccess) {
      if (data.message === 'reset link sent') {
        toast.info('Check your inbox or spam')

        const slideOutAndChangeUrl = async (): Promise<void> => {
          await asyncDelay(1000)
          await slideOut()
          void navigate('..')
        }

        void slideOutAndChangeUrl()
      }
    }
  }, [isSuccess])

  useUpdateEffect(() => {
    if (isError) {
      if (error.response?.data.message === 'does not exists') {
        toast.info('User not found')

        return
      }

      if (error.response?.data.message === 'validation error') {
        toast.warning('Email pattern is not good')

        return
      }

      if (error.response?.data.message === 'account not activated') {
        toast.warning('Account not activated')

        return
      }

      if (error.response?.data.message === 'reset link not sent') {
        toast.warning('Something happened, failed to send the mail')

        return
      }

      if (error.response?.data.message === 'reset key not issued') {
        toast.warning('Something happened, failed to generate reset link')

        return
      }

      toast.error('Internal error')
    }
  }, [isError])

  const onSubmit = (e: React.FormEvent): void => {
    e.preventDefault()

    requestPasswordReset({ email: emailSignal.value })
  }

  return { onSubmit, isPending, isSuccess, isError }
}
