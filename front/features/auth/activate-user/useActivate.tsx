import { navItemId } from '@front/entities/nav/navItemId'
import { navSlice } from '@front/entities/nav/navSlice'
import { useActivateUserMutation } from '@front/entities/user/api/useActivateUserMutation'
import { userSlice } from '@front/entities/user/redux/userSlice'
import { reduxHolder } from '@front/shared/lib/redux'
import type { UseMutationResult } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'
import { useEffectOnce, useUpdateEffect } from 'react-use'
import { toast } from 'sonner'

type Res = {
  isPending: UseMutationResult['isPending']
  isSuccess: UseMutationResult['isSuccess']
  isError: UseMutationResult['isError']
}

export const useActivate = (): Res => {
  const urlParams = useParams()
  const activateUserMutation = useActivateUserMutation()

  useEffectOnce(() => {
    if (urlParams.activationKey !== undefined) {
      activateUserMutation.mutate({ activationKey: urlParams.activationKey })
    }
  })

  useUpdateEffect(() => {
    if (activateUserMutation.isSuccess === true) {
      reduxHolder.dispatch(
        userSlice.actions.setAccessToken({
          accessToken: activateUserMutation.data.accessJwtToken,
        }),
      )

      reduxHolder.dispatch(
        userSlice.actions.rememberLoggedUser({
          email: activateUserMutation.data.email,
          roles: activateUserMutation.data.roles,
        }),
      )

      reduxHolder.dispatch(
        navSlice.actions.hideNavItems({ navItemIds: [navItemId.login] }),
      )

      reduxHolder.dispatch(
        navSlice.actions.showNavItems({ navItemIds: [navItemId.profile] }),
      )
    }
  }, [activateUserMutation.isSuccess])

  useUpdateEffect(() => {
    if (activateUserMutation.isError === true) {
      if (
        activateUserMutation.error.response?.data.errorCode === 'KEY_NOT_FOUND'
      ) {
        toast.warning('Activation key not found')

        return
      }

      if (
        activateUserMutation.error.response?.data.errorCode ===
        'ALREADY_ACTIVATED'
      ) {
        toast.info('Already activated')

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
