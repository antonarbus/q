import { useLogoutIfAccessTokenExpired } from '@features/auth/log-out'
import { useCountUniqueDailyVisitor } from '@features/init-load/useCountUniqueDailyVisitor'
import { useHideInitHtmlElements } from '@features/init-load/useHideInitHtmlElements'
import { useRemoveThirdPartyCookies } from '@features/init-load/useRemoveThirdPartyCookies'
import { useShowDragAndDropArea } from '@features/file/upload-file'
import { useConnectionToBackendCheck } from '@features/init-load/useConnectionToBackend'

export const OnInitLoad = (): React.ReactNode => {
  useLogoutIfAccessTokenExpired()
  useHideInitHtmlElements()
  useShowDragAndDropArea()
  useRemoveThirdPartyCookies()
  useCountUniqueDailyVisitor()
  useConnectionToBackendCheck()

  return null
}
