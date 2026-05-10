import { useLogoutIfAccessTokenExpired } from '@front/features/auth/log-out/useLogoutIfAccessTokenExpired'
import { useShowDragAndDropArea } from '@front/features/file/upload-file'
import { useConnectionToBackendCheck } from '@front/features/on-init-load/check-connection-to-server/useConnectionToBackend'
import { useCountUniqueDailyVisitor } from '@front/features/on-init-load/count-unique-daily-visitors/useCountUniqueDailyVisitor'
import { useHideInitHtmlElements } from '@front/features/on-init-load/hide-loading-text/useHideInitHtmlElements'
import { useRemoveThirdPartyCookies } from '@front/features/on-init-load/remove-third-party-cookies/useRemoveThirdPartyCookies'
import { useFirstVisitGuideHint } from '@front/features/on-init-load/useFirstVisitGuideHint'
import { useInitMousePositionTracking } from '@front/shared/util/mousePosition'

export const OnInitLoad = (): React.ReactNode => {
  useInitMousePositionTracking()
  useLogoutIfAccessTokenExpired()
  useHideInitHtmlElements()
  useShowDragAndDropArea()
  useRemoveThirdPartyCookies()
  useCountUniqueDailyVisitor()
  useConnectionToBackendCheck()
  useFirstVisitGuideHint()

  return null
}
