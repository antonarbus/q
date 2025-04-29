import { useLogoutIfAccessTokenExpired } from '@features/auth/log_out'
import { useCountUniqueDailyVisitor } from '@features/init_load/useCountUniqueDailyVisitor'
import { useHideInitHtmlElements } from '@features/init_load/useHideInitHtmlElements'
import { useRemoveThirdPartyCookies } from '@features/init_load/useRemoveThirdPartyCookies'
import { useShowDragAndDropArea } from '@features/file/upload_file'
import { useConnectionToBackendCheck } from '@features/init_load/useConnectionToBackend'

export const OnInitLoad = (): React.ReactNode => {
  useLogoutIfAccessTokenExpired()
  useHideInitHtmlElements()
  useShowDragAndDropArea()
  useRemoveThirdPartyCookies()
  useCountUniqueDailyVisitor()
  useConnectionToBackendCheck()

  return null
}
