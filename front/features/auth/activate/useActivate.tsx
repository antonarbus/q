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

  const activateUserMutation = useActivateUserMutation()

  useEffectOnce(() => {
    if (activationKey !== undefined) {
      activateUserMutation.mutate({ activationKey })
    }
  })

  useUpdateEffect(() => {
    if (activateUserMutation.isSuccess === true) {
      if (activateUserMutation.data.message === 'activated') {
        const { accessJwtToken, email, roles } = activateUserMutation.data

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

      if (activateUserMutation.data.message === 'already activated') {
        toast.info('Already activated')
      }
    }
  }, [activateUserMutation.isSuccess])

  useUpdateEffect(() => {
    if (activateUserMutation.isError === true) {
      if (
        activateUserMutation.error.response?.data.message ===
        'activation key not found'
      ) {
        toast.warning('Activation key not found')

        return
      }

      toast.error('Internal error')
    }
  }, [activateUserMutation.isError])

  return {
    isPending: activateUserMutation.isPending,
    isSuccess: activateUserMutation.isSuccess,
    isError: activateUserMutation.isError,
  }
}
