import { useLogoutIfAccessTokenExpired } from '@feature/auth/log-out'
import { useShowDragAndDropArea } from '@feature/file/upload-file'
import { useConnectionToBackendCheck } from '@feature/init-load/useConnectionToBackend'
import { useCountUniqueDailyVisitor } from '@feature/init-load/useCountUniqueDailyVisitor'
import { useHideInitHtmlElements } from '@feature/init-load/useHideInitHtmlElements'
import { useRemoveThirdPartyCookies } from '@feature/init-load/useRemoveThirdPartyCookies'
import { useInitMousePositionTracking } from '@shared/util/mousePosition'

export const OnInitLoad = (): React.ReactNode => {
  useInitMousePositionTracking()
  useLogoutIfAccessTokenExpired()
  useHideInitHtmlElements()
  useShowDragAndDropArea()
  useRemoveThirdPartyCookies()
  useCountUniqueDailyVisitor()
  useConnectionToBackendCheck()

  return null
}
