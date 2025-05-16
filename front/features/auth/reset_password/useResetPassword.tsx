import { dispatch } from '@shared/lib/redux'
import type { Signal } from '@preact/signals-react'
import type { UseMutationResult } from '@tanstack/react-query'
import { useNavigate, useParams } from 'react-router-dom'
import { useUpdateEffect } from 'react-use'
import { useResetPasswordMutation, userRole, userSlice } from '@entities/user'
import { navItemId } from '@shared/consts/navItemId'
import { navSlice } from '@shared/nav'
import { toast } from 'sonner'
import type { AnimationScope } from 'motion-dom'
import { asyncDelay } from '@shared/utils/delay'

type Props = {
  passwordSignal: Signal<string>
  modalRef: React.RefObject<HTMLElement> | AnimationScope
  slideOut: () => Promise<void>
}

type Res = {
  onSubmit: (e: React.FormEvent) => void
  isPending: UseMutationResult['isPending']
  isSuccess: UseMutationResult['isSuccess']
  isError: UseMutationResult['isError']
}

export const useResetPassword = ({ passwordSignal, slideOut }: Props): Res => {
  const navigate = useNavigate()
  const { email, resetPasswordKey } = useParams()

  const {
    mutate: resetPassword,
    isPending,
    data,
    isSuccess,
    isError,
    error,
  } = useResetPasswordMutation()

  useUpdateEffect(() => {
    if (isSuccess) {
      if (data.message === 'password was reset') {
        toast('Password was reset')

        if (data.accessJwtToken === undefined) {
          return
        }

        if (data.email === undefined) {
          return
        }

        dispatch(
          userSlice.actions.setAccessToken({
            accessToken: data.accessJwtToken,
          }),
        )

        dispatch(
          userSlice.actions.rememberLoggedUser({
            email: data.email,
            roles: data.roles ?? [userRole.user],
          }),
        )

        dispatch(
          navSlice.actions.hideNavItems({ navItemIds: [navItemId.login] }),
        )

        dispatch(
          navSlice.actions.showNavItems({
            navItemIds: [navItemId.profile],
          }),
        )

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
      if (error.response?.data.message === 'incorrect reset key') {
        toast.warning('Incorrect reset key')

        return
      }

      if (error.response?.data.message === 'validation error') {
        toast.warning('Validation error')

        return
      }

      if (error.response?.data.message === 'not activated') {
        toast.warning('Account not activated')

        return
      }

      toast.error('Internal error')
    }
  }, [isError])

  const onSubmit = (e: React.FormEvent): void => {
    e.preventDefault()

    resetPassword({
      password: passwordSignal.value,
      email: email ?? 'email is missing',
      resetPasswordKey: resetPasswordKey ?? 'resetPasswordKey is missing',
    })
  }

  return { onSubmit, isPending, isSuccess, isError }
}
