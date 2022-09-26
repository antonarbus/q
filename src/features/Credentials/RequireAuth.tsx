import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useSelectorTyped as useSelector } from '@src/store'

type Props = {
  allowedRoles: string[]
}

export function RequireAuth({ allowedRoles }: Props) {
  const location = useLocation()
  const isLogged = useSelector(state => state.credentials.isLogged)
  const roles = useSelector(state => state.credentials.roles)
  console.log(777)
  if (isLogged && allowedRoles.some(role => roles.includes(role))) return <Outlet />
  if (isLogged && !allowedRoles.some(role => roles.includes(role))) return <Navigate to='/unauthorized' state={{ from: location }} replace />
  return <Navigate to='/login' state={{ from: location }} replace />
}
