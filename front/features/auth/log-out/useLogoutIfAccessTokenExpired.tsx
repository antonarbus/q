import { dispatch, useSelector } from '@shared/lib/redux'
import { useUpdateEffect } from 'react-use'
import { userSlice } from '@entities/user'

export const useLogoutIfAccessTokenExpired = (): void => {
  const accessToken = useSelector((state) => state.user.accessToken)

  useUpdateEffect(() => {
    if (accessToken === null) {
      dispatch(userSlice.actions.forgetLoggedUser())
    }
  }, [accessToken])
}
