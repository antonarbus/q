import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useSelectorTyped } from 'client/shared/hooks'

type Props = {
  allowedRoles: string[]
}

export function RequireAuth({ allowedRoles }: Props) {
  const location = useLocation()
  const isLogged = useSelectorTyped(state => state.credentials.isLogged)
  const roles = useSelectorTyped(state => state.credentials.roles)
  const haveRequiredRole = allowedRoles.some(role => roles.includes(role))

  if (isLogged && haveRequiredRole) return <Outlet />
  if (isLogged && !haveRequiredRole) return <Navigate to='/unauthorized' state={{ from: location }} replace />
  return <Navigate to='/login' state={{ from: location }} replace />
}
