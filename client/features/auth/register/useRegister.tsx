import { type Signal } from '@preact/signals-react'
import { type UseMutationResult } from '@tanstack/react-query'
import { useUpdateEffect } from 'react-use'
import { useRegisterMutation } from '@entities/user'
import { notify } from '@shared/ui/top_msg'

type Props = {
  emailSignal: Signal<string>
  passwordSignal: Signal<string>
}

type Res = {
  onSubmit: (e: React.FormEvent) => void
  isPending: UseMutationResult['isPending']
  isSuccess: UseMutationResult['isSuccess']
  isError: UseMutationResult['isError']
}

export const useRegister = ({ emailSignal, passwordSignal }: Props): Res => {
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
        notify({ msg: 'Check your mailbox.', theme: 'light' })
      }
    }
  }, [isSuccess])

  useUpdateEffect(() => {
    if (isError) {
      if (error.response?.data.message === 'already exists') {
        notify({ msg: 'Already exists', type: 'info', theme: 'light' })
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

    registerUser({
      email: emailSignal.value,
      password: passwordSignal.value,
    })
  }

  return { onSubmit, isPending, isSuccess, isError }
}
