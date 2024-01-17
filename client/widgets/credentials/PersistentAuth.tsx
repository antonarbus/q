import { Outlet } from 'react-router-dom'
import { Spinner } from '@widgets/spinner'
import { useRefreshTokens } from './useRefreshTokens'

export const PersistentAuth = (): JSX.Element => {
  const { isCheckingTokens } = useRefreshTokens({ withLoadingState: true })
  if (isCheckingTokens) return <Spinner isShowing title='Password checking' />
  return <Outlet />
}
