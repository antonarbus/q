import { userSlice } from '@entities/user/redux/userSlice'
import { dispatch, useSelector } from '@shared/lib/redux'
import { useUpdateEffect } from 'react-use'

export const useLogoutIfAccessTokenExpired = (): void => {
  const accessToken = useSelector((state) => state.user.accessToken)

  useUpdateEffect(() => {
    if (accessToken === null) {
      dispatch(userSlice.actions.forgetLoggedUser())
    }
  }, [accessToken])
}
