import { dispatch } from '@lib_instances/store'
import { type Signal } from '@preact/signals-react'
import { type UseMutationResult } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'
import { useUpdateEffect } from 'react-use'
import { useResetPasswordMutation, userSlice } from '@entities/user'
import { accessTokenSignal } from '@shared/auth/accessTokenSignal'
import { navItemKey } from '@shared/consts/navItemKey'
import { navSlice } from '@shared/nav'
import { notify } from '@shared/ui/top_msg'

type Props = {
  passwordSignal: Signal<string>
}

type Res = {
  onSubmit: (e: React.FormEvent) => void
  isPending: UseMutationResult['isPending']
  isSuccess: UseMutationResult['isSuccess']
  isError: UseMutationResult['isError']
}

export const useResetPassword = ({ passwordSignal }: Props): Res => {
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
        notify({ msg: 'Password was reset.', theme: 'light' })

        const { accessJwtToken, email, roles } = data

        if (!accessJwtToken) return
        if (!email) return
        if (!roles) return

        accessTokenSignal.value = accessJwtToken
        dispatch(userSlice.actions.rememberLoggedUser({ email, roles }))
        dispatch(
          navSlice.actions.hideNavItems({ navItemIdKeys: [navItemKey.login] }),
        )
        dispatch(
          navSlice.actions.showNavItems({
            navItemIdKeys: [navItemKey.account],
          }),
        )
      }
    }
  }, [isSuccess])

  useUpdateEffect(() => {
    if (isError) {
      if (error.response?.data.message === 'incorrect reset key') {
        notify({ msg: 'Incorrect reset key', type: 'warn', theme: 'light' })
        return
      }

      if (error.response?.data.message === 'validation error') {
        notify({ msg: 'Validation error', type: 'warn', theme: 'light' })
        return
      }

      if (error.response?.data.message === 'not activated') {
        notify({ msg: 'Account not activated', type: 'warn', theme: 'light' })
        return
      }

      notify({ msg: 'Internal error', type: 'error', theme: 'light' })
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
