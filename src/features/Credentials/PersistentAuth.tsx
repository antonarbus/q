import { Outlet } from 'react-router-dom'
import { useRefreshTokens } from './useRefreshTokens'
import { LoadingFullPage } from '@features/application/LoadingFullPage'

export const PersistentAuth = () => {
  const { isCheckingTokens } = useRefreshTokens()

  return (
    <>
      {
        isCheckingTokens
          ? <LoadingFullPage title='Credentials check' />
          : <Outlet />
      }
    </>
  )
}
