import {
  useResetUserPasswordMutation,
  userRole,
  userSlice,
} from '@entities/user'
import type { Signal } from '@preact/signals-react'
import { navItemId } from '@shared/const/navItemId'
import { dispatch } from '@shared/lib/redux'
import { navSlice } from '@shared/nav'
import { asyncDelay } from '@shared/util/delay'
import type { UseMutationResult } from '@tanstack/react-query'
import type { AnimationScope } from 'motion-dom'
import type { FormEvent, RefObject } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useUpdateEffect } from 'react-use'
import { toast } from 'sonner'

type Props = {
  passwordSignal: Signal<string>
  modalRef: RefObject<HTMLElement> | AnimationScope
  slideOut: () => Promise<void>
}

type Res = {
  onSubmit: (e: FormEvent) => void
  isPending: UseMutationResult['isPending']
  isSuccess: UseMutationResult['isSuccess']
  isError: UseMutationResult['isError']
}

export const useResetPassword = ({ passwordSignal, slideOut }: Props): Res => {
  const navigate = useNavigate()
  const { email, resetPasswordKey } = useParams()

  const resetUserPasswordMutation = useResetUserPasswordMutation()

  useUpdateEffect(() => {
    if (resetUserPasswordMutation.isSuccess === true) {
      if (resetUserPasswordMutation.data.message === 'password was reset') {
        toast('Password was reset')

        if (resetUserPasswordMutation.data.accessJwtToken === undefined) {
          return
        }

        if (resetUserPasswordMutation.data.email === undefined) {
          return
        }

        dispatch(
          userSlice.actions.setAccessToken({
            accessToken: resetUserPasswordMutation.data.accessJwtToken,
          }),
        )

        dispatch(
          userSlice.actions.rememberLoggedUser({
            email: resetUserPasswordMutation.data.email,
            roles: resetUserPasswordMutation.data.roles ?? [userRole.user],
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
  }, [resetUserPasswordMutation.isSuccess])

  useUpdateEffect(() => {
    if (resetUserPasswordMutation.isError === true) {
      if (
        resetUserPasswordMutation.error.response?.data.message ===
        'incorrect reset key'
      ) {
        toast.warning('Incorrect reset key')

        return
      }

      if (
        resetUserPasswordMutation.error.response?.data.message ===
        'not activated'
      ) {
        toast.warning('Account not activated')

        return
      }

      toast.error('Internal error')
    }
  }, [resetUserPasswordMutation.isError])

  const onSubmit = (event: FormEvent): void => {
    event.preventDefault()

    resetUserPasswordMutation.mutate({
      password: passwordSignal.value,
      email: email ?? 'email is missing',
      resetPasswordKey: resetPasswordKey ?? 'resetPasswordKey is missing',
    })
  }

  return {
    onSubmit,
    isPending: resetUserPasswordMutation.isPending,
    isSuccess: resetUserPasswordMutation.isSuccess,
    isError: resetUserPasswordMutation.isError,
  }
}
