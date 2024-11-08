import { useSelector } from '@shared/lib/redux'
import type { User } from '@entities/user'

type Props = {
  requiredRoles: User['roles']
  children: React.ReactNode
}

export const RequireRoles = ({
  requiredRoles,
  children,
}: Props): React.ReactNode => {
  const userRoles = useSelector((state) => state.user.roles)

  const haveRequiredRole = requiredRoles.some((role) =>
    userRoles.includes(role),
  )

  if (!haveRequiredRole) {
    return (
      <div
        style={{
          position: 'relative',
          top: '130px',
          fontSize: '30px',
          color: 'grey',
          textAlign: 'center',
          userSelect: 'none',
        }}
      >
        Unauthorized
      </div>
    )
  }

  return children
}
