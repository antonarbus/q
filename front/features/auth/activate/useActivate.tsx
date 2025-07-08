import { dispatch } from '@shared/lib/redux'
import type { UseMutationResult } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'
import { useEffectOnce, useUpdateEffect } from 'react-use'
import { useActivateUserMutation, userSlice } from '@entities/user'
import { navItemId } from '@shared/const/navItemId'
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
  } = useActivateUserMutation()

  useEffectOnce(() => {
    if (activationKey === undefined) {
      return
    }

    activate({ activationKey })
  })

  useUpdateEffect(() => {
    if (isSuccess === true) {
      if (data.message === 'activated') {
        const { accessJwtToken, email, roles } = data

        if (accessJwtToken === undefined) {
          return
        }

        if (email === undefined) {
          return
        }

        if (roles === undefined) {
          return
        }

        dispatch(
          userSlice.actions.setAccessToken({
            accessToken: accessJwtToken,
          }),
        )

        dispatch(userSlice.actions.rememberLoggedUser({ email, roles }))

        dispatch(
          navSlice.actions.hideNavItems({ navItemIds: [navItemId.login] }),
        )

        dispatch(
          navSlice.actions.showNavItems({ navItemIds: [navItemId.profile] }),
        )
      }

      if (data.message === 'already activated') {
        toast.info('Already activated')
      }
    }
  }, [isSuccess])

  useUpdateEffect(() => {
    if (isError === false) {
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
