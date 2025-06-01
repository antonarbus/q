// https://tagmanager.google.com/#/container/accounts/6250651246/containers/196002691/workspaces/5/tags

export const trackSignUpEventAtGoogleAds = (): void => {
  window.dataLayer.push({
    event: 'sendmequotation_today_sign_up',
  })
}
