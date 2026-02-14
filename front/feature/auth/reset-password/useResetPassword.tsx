import { navItemId } from '@entity/nav/navItemId'
import { navSlice } from '@entity/nav/navSlice'
import { useResetUserPasswordMutation } from '@entity/user/api/useResetUserPasswordMutation'
import { userSlice } from '@entity/user/redux/userSlice'
import type { Signal } from '@preact/signals-react'
import { dispatch } from '@shared/lib/redux'
import { asyncDelay } from '@shared/util/asyncDelay'
import type { UseMutationResult } from '@tanstack/react-query'
import type { AnimationScope } from 'motion-dom'
import { useNavigate, useParams } from 'react-router-dom'
import { useUpdateEffect } from 'react-use'
import { toast } from 'sonner'

type Props = {
  passwordSignal: Signal<string>
  modalRef: React.RefObject<HTMLElement> | AnimationScope
  slideOut: () => Promise<void>
}

type Res = {
  handleSubmit: (e: React.SubmitEvent) => void
  isPending: UseMutationResult['isPending']
  isSuccess: UseMutationResult['isSuccess']
  isError: UseMutationResult['isError']
}

export const useResetPassword = (props: Props): Res => {
  const navigate = useNavigate()
  const urlParams = useParams()

  const resetUserPasswordMutation = useResetUserPasswordMutation()

  useUpdateEffect(() => {
    if (resetUserPasswordMutation.isSuccess === true) {
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
          roles: resetUserPasswordMutation.data.roles ?? ['user'],
        }),
      )

      dispatch(navSlice.actions.hideNavItems({ navItemIds: [navItemId.login] }))

      dispatch(
        navSlice.actions.showNavItems({
          navItemIds: [navItemId.profile],
        }),
      )

      const slideOutAndChangeUrl = async (): Promise<void> => {
        await asyncDelay(1000)
        await props.slideOut()
        void navigate('..')
      }

      void slideOutAndChangeUrl()
    }
  }, [resetUserPasswordMutation.isSuccess])

  useUpdateEffect(() => {
    if (resetUserPasswordMutation.isError === true) {
      if (
        resetUserPasswordMutation.error.response?.data.errorCode ===
        'INCORRECT_RESET_KEY'
      ) {
        toast.warning('Incorrect reset key')

        return
      }

      if (
        resetUserPasswordMutation.error.response?.data.errorCode ===
        'NOT_ACTIVATED'
      ) {
        toast.warning('Account not activated')

        return
      }

      toast.error('Internal error')
    }
  }, [resetUserPasswordMutation.isError])

  const handleSubmit = (event: React.SubmitEvent): void => {
    event.preventDefault()

    resetUserPasswordMutation.mutate({
      password: props.passwordSignal.value,
      email: urlParams.email ?? 'email is missing',
      resetPasswordKey:
        urlParams.resetPasswordKey ?? 'resetPasswordKey is missing',
    })
  }

  return {
    handleSubmit,
    isPending: resetUserPasswordMutation.isPending,
    isSuccess: resetUserPasswordMutation.isSuccess,
    isError: resetUserPasswordMutation.isError,
  }
}
