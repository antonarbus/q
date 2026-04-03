import { reduxHolder } from '@front/shared/lib/redux/reduxHolder'

export const useIsFullAppView = (): boolean => {
  const permissionLevel = reduxHolder.useSelector((state) => state.quotation.permissionLevel)

  if (
    ['NEW', 'OWNER', 'SUPER_ADMIN', 'SUPER_ADMIN_ON_BEHALF_OF_A_USER'].includes(permissionLevel)
  ) {
    return true
  }

  return false
}
