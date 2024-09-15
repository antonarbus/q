import { removeCookie } from '@shared/utils/cookie'
import { useEffectOnce } from 'react-use'

export const useRemoveCookies = (): void => {
  useEffectOnce(() => {
    removeCookie({ name: 'cmapi_gtm_bl' })
    removeCookie({ name: 'euconsent-v2' })
    removeCookie({ name: 'notice_gdpr_prefs' })
    removeCookie({ name: 'notice_preferences' })
    removeCookie({ name: 'pvisitor' })
  })
}
