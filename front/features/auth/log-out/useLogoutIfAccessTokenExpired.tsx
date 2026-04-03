import { userSlice } from '@front/entities/user/redux/userSlice'
import { reduxHolder } from '@front/shared/lib/redux/reduxHolder'
import { useUpdateEffect } from 'react-use'

export const useLogoutIfAccessTokenExpired = (): void => {
  const accessToken = reduxHolder.useSelector((state) => state.user.accessToken)

  useUpdateEffect(() => {
    if (accessToken === null) {
      reduxHolder.dispatch(userSlice.actions.forgetLoggedUser())
    }
  }, [accessToken])
}
