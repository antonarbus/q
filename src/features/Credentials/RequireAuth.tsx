import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useSelectorTyped as useSelector } from '@src/store'

type Props = {
  allowedRoles: string[]
}

export function RequireAuth({ allowedRoles }: Props) {
  const location = useLocation()
  const isLogged = useSelector(state => state.credentials.isLogged)
  const role = useSelector(state => state.credentials.role)

  if (isLogged && allowedRoles.includes(role)) return <Outlet />
  if (isLogged && !allowedRoles.includes(role)) return <Navigate to='/unauthorized' state={{ from: location }} replace />
  return <Navigate to='/login' state={{ from: location }} replace />
}
