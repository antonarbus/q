import { useLogoutIfAccessTokenExpired } from '@feature/auth/log-out/useLogoutIfAccessTokenExpired'
import { useShowDragAndDropArea } from '@feature/file/upload-file'
import { useConnectionToBackendCheck } from '@feature/on-init-load/check-connection-to-server/useConnectionToBackend'
import { useCountUniqueDailyVisitor } from '@feature/on-init-load/count-unique-daily-visitors/useCountUniqueDailyVisitor'
import { useHideInitHtmlElements } from '@feature/on-init-load/hide-loading-text/useHideInitHtmlElements'
import { useRemoveThirdPartyCookies } from '@feature/on-init-load/remove-third-party-cookies/useRemoveThirdPartyCookies'
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
