import { Outlet } from 'react-router-dom'
import { useGetAccessToken } from '@features/auth/get_access_token'
import { LoadingDotsOverlay } from '@shared/loading_dots_overlay'

export const PersistentAuth = (): JSX.Element => {
  const { isCheckingTokens } = useGetAccessToken({ withLoadingState: true })
  if (isCheckingTokens) return <LoadingDotsOverlay isShowing title='Password checking' />
  return <Outlet />
}
