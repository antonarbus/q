import { Outlet } from 'react-router-dom'
import { useRefreshTokens } from './useRefreshTokens'
import { Spinner } from 'client/widgets/spinner'

export const PersistentAuth = () => {
  const { isCheckingTokens } = useRefreshTokens({ withLoadingState: true })
  return isCheckingTokens
    ? <Spinner isShowing title='Password checking' />
    : <Outlet />
}
