import { Outlet } from 'react-router-dom'
import { Spinner } from '@shared/spinner'
import { useGetAccessToken } from './useGetAccessToken'

export const PersistentAuth = (): JSX.Element => {
  const { isCheckingTokens } = useGetAccessToken({ withLoadingState: true })
  if (isCheckingTokens) return <Spinner isShowing title='Password checking' />
  return <Outlet />
}
