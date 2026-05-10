import { useLogoutIfAccessTokenExpired } from '@front/features/auth/log-out/useLogoutIfAccessTokenExpired'
import { useShowDragAndDropArea } from '@front/features/file/upload-file'
import { useCheckConnectionToBackend } from '@front/features/on-init-load/check-connection-to-server/useCheckConnectionToBackend'
import { useCountUniqueDailyVisitor } from '@front/features/on-init-load/count-unique-daily-visitors/useCountUniqueDailyVisitor'
import { useHideInitHtmlElements } from '@front/features/on-init-load/hide-loading-text/useHideInitHtmlElements'
import { useRemoveThirdPartyCookies } from '@front/features/on-init-load/remove-third-party-cookies/useRemoveThirdPartyCookies'
import { useProposeWelcomeGuide } from '@front/features/welcome-guide/propose-welcome-guide/useProposeWelcomeGuide'
import { useTrackMousePosition } from '@front/features/on-init-load/track-mouse-position/useTrackMousePosition'

export const OnInitLoad = (): React.ReactNode => {
  useTrackMousePosition()
  useLogoutIfAccessTokenExpired()
  useHideInitHtmlElements()
  useShowDragAndDropArea()
  useRemoveThirdPartyCookies()
  useCountUniqueDailyVisitor()
  useCheckConnectionToBackend()
  useProposeWelcomeGuide()

  return null
}
