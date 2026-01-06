import type { SelectUser } from '@back/entities/user/usersTableSchema'
import { useGetUserAccessTokenQuery } from '@entities/user/api/useGetUserAccessTokenQuery'
import { useSelector } from '@shared/lib/redux'
import type { ReactNode } from 'react'

type Props = {
  requiredRoles: SelectUser['roles']
  children: ReactNode
}

export const RequireRoles = (props: Props): ReactNode => {
  const getUserAccessTokenQuery = useGetUserAccessTokenQuery()

  const userRoles = useSelector((state) => state.user.roles)

  const haveRequiredRole = props.requiredRoles.some((role) =>
    userRoles.includes(role),
  )

  if (getUserAccessTokenQuery.isLoading === true) {
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

  return props.children
}
