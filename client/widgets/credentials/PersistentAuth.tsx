import { Outlet } from 'react-router-dom'
import { useRefreshTokens } from './useRefreshTokens'
import { Spinner } from '@widgets/spinner'

export const PersistentAuth = (): JSX.Element => {
  const { isCheckingTokens } = useRefreshTokens({ withLoadingState: true })
  if (isCheckingTokens) return <Spinner isShowing title='Password checking' />
  return <Outlet />
}
