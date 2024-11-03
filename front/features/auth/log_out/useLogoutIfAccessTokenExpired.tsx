import { dispatch } from '@lib_instances/store'
import { useUpdateEffect } from 'react-use'
import { userSlice, accessTokenSignal } from '@entities/user'

export const useLogoutIfAccessTokenExpired = (): void => {
  useUpdateEffect(() => {
    if (accessTokenSignal.value === null) {
      dispatch(userSlice.actions.forgetLoggedUser())
    }
  }, [accessTokenSignal.value])
}
