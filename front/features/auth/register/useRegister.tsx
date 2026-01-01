import { navItemId } from '@entities/nav/navItemId'
import { navSlice } from '@entities/nav/navSlice'
import { useRegisterUserMutation } from '@entities/user/api/useRegisterUserMutation'
import { userSlice } from '@entities/user/redux/userSlice'
import type { Signal } from '@preact/signals-react'
import { appSlice } from '@shared/appSlice'
import { dispatch, getState } from '@shared/lib/redux'
import { asyncDelay } from '@shared/util/asyncDelay'
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
  handleSubmit: (e: FormEvent) => void
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

      dispatch(
        userSlice.actions.setAccessToken({
          accessToken: registerUserMutation.data.accessJwtToken,
        }),
      )

      dispatch(
        userSlice.actions.rememberLoggedUser({
          email: registerUserMutation.data.email,
          roles: registerUserMutation.data.roles,
        }),
      )

      dispatch(navSlice.actions.hideNavItems({ navItemIds: [navItemId.login] }))

      dispatch(
        navSlice.actions.showNavItems({ navItemIds: [navItemId.profile] }),
      )

      const slideOutAndChangeUrl = async (): Promise<void> => {
        await asyncDelay(1000)
        await props.slideOut()

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

  const handleSubmit = (event: FormEvent): void => {
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
