import { useLogoutIfAccessTokenExpired } from '@features/auth/log_out'
import { useCountUniqueDailyVisitor } from '@features/init_load/useCountUniqueDailyVisitor'
import { useHideInitHtmlElements } from '@features/init_load/useHideInitHtmlElements'
import { useRemoveThirdPartyCookies } from '@features/init_load/useRemoveThirdPartyCookies'
import { useOnDragOnDrop } from '@features/upload'

export const OnInitLoad = (): React.ReactNode => {
  useLogoutIfAccessTokenExpired()
  useHideInitHtmlElements()
  useOnDragOnDrop()
  useRemoveThirdPartyCookies()
  useCountUniqueDailyVisitor()

  return null
}
