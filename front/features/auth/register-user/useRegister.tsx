import { navItemId } from '@front/entities/nav/navItemId'
import { navSlice } from '@front/entities/nav/navSlice'
import { useRegisterUserMutation } from '@front/entities/user/api/useRegisterUserMutation'
import { userSlice } from '@front/entities/user/redux/userSlice'
import type { Signal } from '@preact/signals-react'
import { appSlice } from '@front/shared/appSlice'
import { reduxHolder } from '@front/shared/lib/redux'
import { asyncDelay } from '@front/shared/util/asyncDelay'
import type { UseMutationResult } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { useUpdateEffect } from 'react-use'
import { toast } from 'sonner'

type Props = {
  emailSignal: Signal<string>
  passwordSignal: Signal<string>
  slideOut: () => Promise<void>
}

type Res = {
  handleSubmit: (e: React.SubmitEvent) => void
  isPending: UseMutationResult['isPending']
  isSuccess: UseMutationResult['isSuccess']
  isError: UseMutationResult['isError']
}

export const useRegister = (props: Props): Res => {
  const navigate = useNavigate()

  const registerUserMutation = useRegisterUserMutation()

  useUpdateEffect(() => {
    if (registerUserMutation.isSuccess === true) {
      toast.info('Check your inbox or spam')

      reduxHolder.dispatch(
        userSlice.actions.setAccessToken({
          accessToken: registerUserMutation.data.accessJwtToken,
        }),
      )

      reduxHolder.dispatch(
        userSlice.actions.rememberLoggedUser({
          email: registerUserMutation.data.email,
          roles: registerUserMutation.data.roles,
        }),
      )

      reduxHolder.dispatch(
        navSlice.actions.hideNavItems({ navItemIds: [navItemId.login] }),
      )

      reduxHolder.dispatch(
        navSlice.actions.showNavItems({ navItemIds: [navItemId.profile] }),
      )

      const slideOutAndChangeUrl = async (): Promise<void> => {
        await asyncDelay(1000)
        await props.slideOut()

        const navigateTo = reduxHolder.getState().app.navigateState.to

        if (navigateTo !== undefined) {
          await navigate(navigateTo)
          reduxHolder.dispatch(appSlice.actions.resetNavigateState())

          return
        }

        void navigate('..')
      }

      void slideOutAndChangeUrl()
    }
  }, [registerUserMutation.isSuccess])

  useUpdateEffect(() => {
    if (registerUserMutation.isError === true) {
      if (
        registerUserMutation.error.response?.data.errorCode === 'ALREADY_EXISTS'
      ) {
        toast.info('Already registered')

        return
      }

      if (
        registerUserMutation.error.response?.data.errorCode ===
        'ACTIVATION_KEY_NOT_ISSUED'
      ) {
        toast.warning('Something went wrong, activation key was not issued')

        return
      }

      if (
        registerUserMutation.error.response?.data.errorCode ===
        'ACTIVATION_LINK_NOT_SENT'
      ) {
        toast.warning('Something went wrong, activation key was not sent')

        return
      }

      toast.error('Internal error')
    }
  }, [registerUserMutation.isError])

  const handleSubmit = (event: React.SubmitEvent): void => {
    event.preventDefault()

    registerUserMutation.mutate({
      email: props.emailSignal.value,
      password: props.passwordSignal.value,
    })
  }

  return {
    handleSubmit,
    isPending: registerUserMutation.isPending,
    isSuccess: registerUserMutation.isSuccess,
    isError: registerUserMutation.isError,
  }
}
