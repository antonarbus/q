import { useRegisterUserMutation, userSlice } from '@entities/user'
import type { Signal } from '@preact/signals-react'
import { appSlice } from '@shared/appSlice'
import { trackSignUpEventAtGoogleTagManager } from '@shared/lib/google-tag-manager/trackSignUpEventAtGoogleTagManager'
import { dispatch, getState } from '@shared/lib/redux'
import { navItemId } from '@shared/nav/navItemId'
import { navSlice } from '@shared/nav/navSlice'
import { asyncDelay } from '@shared/util/delay'
import type { UseMutationResult } from '@tanstack/react-query'
import type { FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { useUpdateEffect } from 'react-use'
import { toast } from 'sonner'

type Props = {
  emailSignal: Signal<string>
  passwordSignal: Signal<string>
  slideOut: () => Promise<void>
}

type Res = {
  onSubmit: (e: FormEvent) => void
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

  const registerUserMutation = useRegisterUserMutation()

  useUpdateEffect(() => {
    if (registerUserMutation.isSuccess === true) {
      if (registerUserMutation.data.message === 'activation link sent') {
        toast.info('Check your inbox or spam')
      }

      const { accessJwtToken, email, roles } = registerUserMutation.data

      dispatch(
        userSlice.actions.setAccessToken({
          accessToken: accessJwtToken,
        }),
      )

      dispatch(userSlice.actions.rememberLoggedUser({ email, roles }))

      dispatch(navSlice.actions.hideNavItems({ navItemIds: [navItemId.login] }))

      dispatch(
        navSlice.actions.showNavItems({ navItemIds: [navItemId.profile] }),
      )

      const slideOutAndChangeUrl = async (): Promise<void> => {
        await asyncDelay(1000)
        await slideOut()

        const navigateTo = getState().app.navigateState.to

        if (navigateTo !== undefined) {
          await navigate(navigateTo)
          dispatch(appSlice.actions.resetNavigateState())

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
        registerUserMutation.error.response?.data.message === 'already exists'
      ) {
        toast.info('Already registered')

        return
      }

      if (
        registerUserMutation.error.response?.data.message ===
        'activation key not issued'
      ) {
        toast.warning('Something went wrong, activation key was not issued')

        return
      }

      if (
        registerUserMutation.error.response?.data.message ===
        'activation link not sent'
      ) {
        toast.warning('Something went wrong, activation key was not sent')

        return
      }

      toast.error('Internal error')
    }
  }, [registerUserMutation.isError])

  const onSubmit = (event: FormEvent): void => {
    event.preventDefault()

    registerUserMutation.mutate({
      email: emailSignal.value,
      password: passwordSignal.value,
    })

    trackSignUpEventAtGoogleTagManager()
  }

  return {
    onSubmit,
    isPending: registerUserMutation.isPending,
    isSuccess: registerUserMutation.isSuccess,
    isError: registerUserMutation.isError,
  }
}
