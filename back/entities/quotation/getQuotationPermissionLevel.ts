import type { SelectUser } from '../user/usersTableSchema'
import type { Quotation } from './schemas'

type Props = {
  user: {
    email: SelectUser['email']
    roles: SelectUser['roles']
  } | null
  quotationEmail: string
  quotationAccess: {
    level: 'everyone' | 'nobody' | 'custom'
    userList: string[]
  }
  shouldTrace: boolean
}

export const getQuotationPermissionLevel = (
  props: Props,
): Quotation['permissionLevel'] => {
  const isLoggedUser = props.user !== null
  const emailFromToken = props.user?.email

  const isOwner = isLoggedUser && emailFromToken === props.quotationEmail

  if (isOwner === true) {
    return 'OWNER'
  }

  const isSharedWithYou =
    emailFromToken !== undefined &&
    props.quotationAccess.level === 'custom' &&
    props.quotationAccess.userList.includes(emailFromToken)

  if (isSharedWithYou === true) {
    return 'SHARED'
  }

  const isSharedWithEveryone = props.quotationAccess.level === 'everyone'

  if (isSharedWithEveryone === true) {
    return 'PUBLIC'
  }

  const isSuperAdminOnBehalfOfUser = isLoggedUser && props.shouldTrace === false

  if (isSuperAdminOnBehalfOfUser === true) {
    return 'SUPER_ADMIN_ON_BEHALF_OF_A_USER'
  }

  const isSuperAdmin = isLoggedUser && props.user?.roles.includes('super-admin')

  if (isSuperAdmin === true) {
    return 'SUPER_ADMIN'
  }

  return 'FORBIDDEN'
}
