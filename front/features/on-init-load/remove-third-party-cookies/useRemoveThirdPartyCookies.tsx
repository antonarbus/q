import { removeCookie } from '@front/shared/util/cookie'
import { useEffectOnce } from 'react-use'

export const useRemoveThirdPartyCookies = (): void => {
  useEffectOnce(() => {
    void removeCookie({ name: 'cmapi_gtm_bl' })
    void removeCookie({ name: 'euconsent-v2' })
    void removeCookie({ name: 'notice_gdpr_prefs' })
    void removeCookie({ name: 'notice_preferences' })
    void removeCookie({ name: 'pvisitor' })
  })
}
