import { SpinnerFullPage } from '@features/spinner/SpinnerFullPage'
import { Outlet } from 'react-router-dom'
import { useRefreshTokens } from './useRefreshTokens'

export const PersistentAuth = () => {
  const { isCheckingTokens } = useRefreshTokens({ withLoadingState: true })
  return isCheckingTokens
    ? <SpinnerFullPage isShowing title='Password checking' />
    : <Outlet />
}
