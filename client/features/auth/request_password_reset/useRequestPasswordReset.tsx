import { type Signal } from '@preact/signals-react'
import { type UseMutationResult } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { useUpdateEffect } from 'react-use'
import { useRequestPasswordResetMutation } from '@entities/user'
import { notify } from '@shared/ui/top_msg'
import { slideElement } from '@shared/utils/slideElement'

type Props = {
  emailSignal: Signal<string>
  modalRef: React.RefObject<HTMLDivElement>
}

type Res = {
  onSubmit: (e: React.FormEvent) => void
  isPending: UseMutationResult['isPending']
  isSuccess: UseMutationResult['isSuccess']
  isError: UseMutationResult['isError']
}

export const useRequestPasswordReset = ({
  emailSignal,
  modalRef,
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

      if (error.response?.data.message === 'reset key not issued') {
        notify({
          msg: 'Something happened, failed to reset',
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
