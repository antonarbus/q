import { navItemId } from '@front/shared/nav/navItemId'
import { navSlice } from '@front/shared/nav/navSlice'
import { useResetUserPasswordMutation } from '@front/entities/user/api/useResetUserPasswordMutation'
import { userSlice } from '@front/entities/user/redux/userSlice'
import type { Signal } from '@preact/signals-react'
import { reduxHolder } from '@front/shared/lib/redux/reduxHolder'
import { asyncDelay } from '@front/shared/util/asyncDelay'
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
  handleSubmit: (event: React.SubmitEvent) => void
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

      reduxHolder.dispatch(
        userSlice.actions.setAccessToken({
          accessToken: resetUserPasswordMutation.data.accessJwtToken,
        }),
      )

      reduxHolder.dispatch(
        userSlice.actions.rememberLoggedUser({
          email: resetUserPasswordMutation.data.email,
          roles: resetUserPasswordMutation.data.roles,
        }),
      )

      reduxHolder.dispatch(navSlice.actions.hideNavItems({ navItemIds: [navItemId.login] }))

      reduxHolder.dispatch(
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
      if (resetUserPasswordMutation.error.response?.data.errorCode === 'INCORRECT_RESET_KEY') {
        toast.warning('Incorrect reset key')

        return
      }

      if (resetUserPasswordMutation.error.response?.data.errorCode === 'NOT_ACTIVATED') {
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
      resetPasswordKey: urlParams.resetPasswordKey ?? 'resetPasswordKey is missing',
    })
  }

  return {
    handleSubmit,
    isPending: resetUserPasswordMutation.isPending,
    isSuccess: resetUserPasswordMutation.isSuccess,
    isError: resetUserPasswordMutation.isError,
  }
}
