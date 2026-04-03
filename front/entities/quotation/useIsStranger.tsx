import { reduxHolder } from '@front/shared/lib/redux'

export const useIsStranger = (): boolean => {
  const permissionLevel = reduxHolder.useSelector((state) => state.quotation.permissionLevel)

  if (['FORBIDDEN', 'PUBLIC', 'SHARED'].includes(permissionLevel)) {
    return true
  }

  return false
}
