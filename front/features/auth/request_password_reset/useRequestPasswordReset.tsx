import type { Signal } from '@preact/signals-react'
import type { UseMutationResult } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { useUpdateEffect } from 'react-use'
import { useRequestPasswordResetMutation } from '@entities/user'
import { notify } from '@shared/toast'
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
        notify({ msg: 'Check your inbox or spam', theme: 'light' })

        const slideOutAndChangeUrl = async (): Promise<void> => {
          await asyncDelay(1000)
          await slideOut()
          navigate('..')
        }

        void slideOutAndChangeUrl()
      }
    }
  }, [isSuccess])

  useUpdateEffect(() => {
    if (isError) {
      if (error.response?.data.message === 'does not exists') {
        notify({ msg: 'User not found', type: 'info', theme: 'light' })

        return
      }

      if (error.response?.data.message === 'validation error') {
        notify({
          msg: 'Email pattern is not good',
          type: 'warn',
          theme: 'light',
        })

        return
      }

      if (error.response?.data.message === 'account not activated') {
        notify({ msg: 'Account not activated', type: 'warn', theme: 'light' })

        return
      }

      if (error.response?.data.message === 'reset link not sent') {
        notify({
          msg: 'Something happened, failed to send the mail',
          type: 'warn',
          theme: 'light',
        })

        return
      }

      if (error.response?.data.message === 'reset key not issued') {
        notify({
          msg: 'Something happened, failed to generate reset link',
          type: 'warn',
          theme: 'light',
        })

        return
      }

      notify({ msg: 'Internal error', type: 'error', theme: 'light' })
    }
  }, [isError])

  const onSubmit = (e: React.FormEvent): void => {
    e.preventDefault()

    requestPasswordReset({ email: emailSignal.value })
  }

  return { onSubmit, isPending, isSuccess, isError }
}
