import type { Signal } from '@preact/signals-react'
import type { UseMutationResult } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { useUpdateEffect } from 'react-use'
import { useRegisterMutation } from '@entities/user'
import { toast } from 'sonner'
import { asyncDelay } from '@shared/utils/delay'
import { trackSignUpEventAtGoogleTagManager } from '@shared/lib/google_tag_manager/trackSignUpEventAtGoogleTagManager'

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
    if (isSuccess === true) {
      if (data.message === 'activation link sent') {
        toast.info('Check your inbox or spam')
      }

      const slideOutAndChangeUrl = async (): Promise<void> => {
        await asyncDelay(1000)
        await slideOut()
        void navigate('..')
      }

      void slideOutAndChangeUrl()
    }
  }, [isSuccess])

  useUpdateEffect(() => {
    if (isError === true) {
      if (error.response?.data.message === 'already exists') {
        toast.info('Already registered')

        return
      }

      if (error.response?.data.message === 'validation error') {
        toast.warning('Validation error')

        return
      }

      if (error.response?.data.message === 'activation key not issued') {
        toast.warning('Something went wrong, activation key was not issued')

        return
      }

      if (error.response?.data.message === 'activation link not sent') {
        toast.warning('Something went wrong, activation key was not sent')

        return
      }

      toast.error('Internal error')
    }
  }, [isError])

  const onSubmit = (event: React.FormEvent): void => {
    event.preventDefault()

    registerUser({
      email: emailSignal.value,
      password: passwordSignal.value,
    })

    trackSignUpEventAtGoogleTagManager()
  }

  return { onSubmit, isPending, isSuccess, isError }
}
