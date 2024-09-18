import { dispatch } from '@lib_instances/store'
import { useUpdateEffect } from 'react-use'
import { userSlice } from '@entities/user'
import { accessTokenSignal } from '@shared/auth/accessTokenSignal'

export const useLogoutIfAccessTokenExpired = (): void => {
  useUpdateEffect(() => {
    if (accessTokenSignal.value === null) {
      dispatch(userSlice.actions.forgetLoggedUser())
    }
  }, [accessTokenSignal.value])
}
