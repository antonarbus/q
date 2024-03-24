import { Outlet } from 'react-router-dom'
import { LoadingDotsOverlay } from '@shared/loading_dots_overlay'
import { useGetAccessToken } from './useGetAccessToken'

export const PersistentAuth = (): JSX.Element => {
  const { isCheckingTokens } = useGetAccessToken({ withLoadingState: true })
  if (isCheckingTokens) return <LoadingDotsOverlay isShowing title='Password checking' />
  return <Outlet />
}
