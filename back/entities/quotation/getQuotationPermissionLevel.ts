import { userRole } from '@entities/user/const/userRole'
import type { SelectUser } from '../user'
import type { Quotation } from './quotationSchema'
import type { SelectQuotation } from './quotationsTableSchema'

type Props = {
  user: {
    email: SelectUser['email']
    roles: SelectUser['roles']
  } | null
  quotation: SelectQuotation
  shouldTrace: boolean
}

export const getQuotationPermissionLevel = (
  props: Props,
): Quotation['permissionLevel'] => {
  const isLoggedUser = props.user !== null
  const emailFromToken = props.user?.email

  const isOwner = isLoggedUser && emailFromToken === props.quotation.email

  if (isOwner === true) {
    return 'OWNER'
  }

  const isSharedWithYou =
    emailFromToken !== undefined &&
    props.quotation.access.level === 'custom' &&
    props.quotation.access.userList.includes(emailFromToken)

  if (isSharedWithYou === true) {
    return 'SHARED'
  }

  const isSharedWithEveryone = props.quotation.access.level === 'everyone'

  if (isSharedWithEveryone === true) {
    return 'PUBLIC'
  }

  const isSuperAdminOnBehalfOfUser = isLoggedUser && props.shouldTrace === false

  if (isSuperAdminOnBehalfOfUser === true) {
    return 'SUPER_ADMIN_ON_BEHALF_OF_A_USER'
  }

  const isSuperAdmin =
    isLoggedUser && props.user?.roles.includes(userRole.superAdmin)

  if (isSuperAdmin === true) {
    return 'SUPER_ADMIN'
  }

  return 'FORBIDDEN'
}
