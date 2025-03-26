import { dispatch } from '@shared/lib/redux'
import type { UseMutationResult } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'
import { useEffectOnce, useUpdateEffect } from 'react-use'
import { useActivateMutation, userSlice } from '@entities/user'
import { navItemId } from '@shared/consts/navItemId'
import { navSlice } from '@shared/nav'
import { toast } from 'sonner'

type Res = {
  isPending: UseMutationResult['isPending']
  isSuccess: UseMutationResult['isSuccess']
  isError: UseMutationResult['isError']
}

export const useActivate = (): Res => {
  const { activationKey } = useParams()

  const {
    mutate: activate,
    isPending,
    data,
    isSuccess,
    isError,
    error,
  } = useActivateMutation()

  useEffectOnce(() => {
    if (activationKey === undefined) {
      return
    }

    activate({ activationKey })
  })

  useUpdateEffect(() => {
    if (!isSuccess) {
      return
    }

    if (data.message === 'activated') {
      toast('Activated')

      const { accessJwtToken, email, roles } = data

      if (!accessJwtToken) {
        return
      }

      if (!email) {
        return
      }

      if (!roles) {
        return
      }

      dispatch(
        userSlice.actions.setAccessToken({
          accessToken: accessJwtToken,
        }),
      )

      dispatch(userSlice.actions.rememberLoggedUser({ email, roles }))

      dispatch(
        navSlice.actions.hideNavItems({ navItemIdKeys: [navItemId.login] }),
      )

      dispatch(
        navSlice.actions.showNavItems({ navItemIdKeys: [navItemId.profile] }),
      )
    }

    if (data.message === 'already activated') {
      toast.info('Already activated')
    }
  }, [isSuccess])

  useUpdateEffect(() => {
    if (!isError) {
      return
    }

    if (error.response?.data.message === 'activation key not found') {
      toast.warning('Activation key not found')

      return
    }

    toast.error('Internal error')
  }, [isError])

  return { isPending, isSuccess, isError }
}
