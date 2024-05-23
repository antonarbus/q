import { useSelectorTyped } from '@lib_instances/store'
import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { accessTokenSignal } from '@shared/auth/accessTokenSignal'

type Props = {
  allowedRoles: string[]
}

export const RequireAuth = ({ allowedRoles }: Props): JSX.Element => {
  const location = useLocation()
  const isLogged = accessTokenSignal.value !== null
  const roles = useSelectorTyped((state) => state.user.roles)
  const haveRequiredRole = allowedRoles.some((role) => roles.includes(role))

  if (isLogged && haveRequiredRole) return <Outlet />
  if (isLogged && !haveRequiredRole) {
    return <Navigate to='/unauthorized' state={{ from: location }} replace />
  }
  return <Navigate to='/login' state={{ from: location }} replace />
}
