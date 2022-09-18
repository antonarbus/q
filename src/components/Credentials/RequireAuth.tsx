import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useSelectorTyped as useSelector } from '@src/store'

export function RequireAuth() {
  const location = useLocation()
  const isLogged = useSelector(state => state.user.isLogged)
  return (
    isLogged
      ? <Outlet />
      : <Navigate to='/login' state={{ from: location }} replace />
  )
}
