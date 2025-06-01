// https://tagmanager.google.com/#/container/accounts/6250651246/containers/196002691/workspaces/5/tags

export const trackSignUpEventAtGoogleTagManager = (): void => {
  // fires a Custom Event in Google Tag Manager.
  window.dataLayer.push({
    event: 'sendmequotation_today_sign_up',
  })
}
