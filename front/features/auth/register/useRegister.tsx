import type { Signal } from '@preact/signals-react'
import type { UseMutationResult } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { useUpdateEffect } from 'react-use'
import { useRegisterMutation } from '@entities/user'
import { notify } from '@shared/toast'
import { asyncDelay } from '@shared/utils/delay'

type Props = {
  emailSignal: Signal<string>
  passwordSignal: Signal<string>
  slideOut: () => Promise<void>
}

type Res = {
  onSubmit: (e: React.FormEvent) => void
  isPending: UseMutationResult['isPending']
  isSuccess: UseMutationResult['isSuccess']
  isError: UseMutationResult['isError']
}

export const useRegister = ({
  emailSignal,
  passwordSignal,
  slideOut,
}: Props): Res => {
  const navigate = useNavigate()

  const {
    mutate: registerUser,
    isPending,
    data,
    isSuccess,
    isError,
    error,
  } = useRegisterMutation()

  useUpdateEffect(() => {
    if (isSuccess) {
      if (data.message === 'activation link sent') {
        notify({ msg: 'Check your inbox or spam', theme: 'light' })
      }

      const slideOutAndChangeUrl = async (): Promise<void> => {
        await asyncDelay(1000)
        await slideOut()
        navigate('..')
      }

      void slideOutAndChangeUrl()
    }
  }, [isSuccess])

  useUpdateEffect(() => {
    if (isError) {
      if (error.response?.data.message === 'already exists') {
        notify({ msg: 'Already registered', type: 'info', theme: 'light' })

        return
      }

      if (error.response?.data.message === 'validation error') {
        notify({ msg: 'Validation error', type: 'warn', theme: 'light' })

        return
      }

      if (error.response?.data.message === 'activation key not issued') {
        notify({
          msg: 'Something went wrong, activation key was not issued',
          type: 'warn',
          theme: 'light',
        })

        return
      }

      if (error.response?.data.message === 'activation link not sent') {
        notify({
          msg: 'Something went wrong, activation key was not sent',
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

    registerUser({
      email: emailSignal.value,
      password: passwordSignal.value,
    })
  }

  return { onSubmit, isPending, isSuccess, isError }
}
