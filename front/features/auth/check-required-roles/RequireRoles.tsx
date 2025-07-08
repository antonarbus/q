import { useSelector } from '@shared/lib/redux'
import { useGetUserAccessTokenQuery, type User } from '@entities/user'

type Props = {
  requiredRoles: User['roles']
  children: React.ReactNode
}

export const RequireRoles = ({
  requiredRoles,
  children,
}: Props): React.ReactNode => {
  const { isLoading } = useGetUserAccessTokenQuery()

  const userRoles = useSelector((state) => state.user.roles)

  const haveRequiredRole = requiredRoles.some((role) =>
    userRoles.includes(role),
  )

  if (isLoading === true) {
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
        Checking credentials...
      </div>
    )
  }

  if (haveRequiredRole === false) {
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
