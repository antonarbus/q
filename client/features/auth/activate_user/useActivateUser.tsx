import { dispatch } from '@lib_instances/store'
import { type UseMutationResult } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'
import { useEffectOnce, useUpdateEffect } from 'react-use'
import { useActivateMutation, userSlice } from '@entities/user'
import { accessTokenSignal } from '@shared/auth/accessTokenSignal'
import { navItemId } from '@shared/consts/navItemId'
import { navSlice } from '@shared/nav'
import { notify } from '@shared/ui/top_msg'

type Res = {
  isPending: UseMutationResult['isPending']
  isSuccess: UseMutationResult['isSuccess']
  isError: UseMutationResult['isError']
}

export const useActivateUser = (): Res => {
  const { activationKey } = useParams()
  const { mutate: activate, isPending, data, isSuccess, isError, error } = useActivateMutation()

  useEffectOnce(() => {
    if (activationKey === undefined) return
    activate({ activationKey })
  })

  useUpdateEffect(() => {
    if (!isSuccess) return

    if (data.message === 'activated') {
      notify({ msg: 'Activated', theme: 'light' })

      const { accessJwtToken, email, roles } = data

      if (!accessJwtToken) return
      if (!email) return
      if (!roles) return

      accessTokenSignal.value = accessJwtToken
      dispatch(userSlice.actions.rememberLoggedUser({ email, roles }))
      dispatch(navSlice.actions.hideNavItems({ navItemIdKeys: [navItemId.login] }))
      dispatch(navSlice.actions.showNavItems({ navItemIdKeys: [navItemId.account] }))
    }

    if (data.message === 'already activated') {
      notify({ msg: 'Already activated', type: 'info', theme: 'light' })
    }
  }, [isSuccess])

  useUpdateEffect(() => {
    if (!isError) return

    if (error.response?.data.message === 'activation key not found') {
      notify({ msg: 'Activation key not found', type: 'warn', theme: 'light' })
      return
    }

    notify({ msg: 'Internal error', type: 'error', theme: 'light' })
  }, [isError])

  return { isPending, isSuccess, isError }
}
