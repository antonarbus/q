import { useSelectorTyped } from '@lib_instances/store'
import type { User } from '@entities/user'

type Props = {
  requiredRoles: User['roles']
  children: React.ReactNode
}

export const RequireRoles = ({
  requiredRoles,
  children,
}: Props): React.ReactNode => {
  const userRoles = useSelectorTyped((state) => state.user.roles)
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
