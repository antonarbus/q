// https://tagmanager.google.com/#/container/accounts/6250651246/containers/196002691/workspaces/5/tags

/**
 * We have a Custom Event Trigger for "sendmequotation_today_sign_up"
 * That trigger fires a GA4 Event Tag
 * That GA4 Event sends event_name: "conversion_event_subscribe_paid_2"
 * This event "conversion_event_subscribe_paid_2" is tracked as conversion at Google Ads
 **/

export const trackSignUpEventAtGoogleTagManager = (): void => {
  window.dataLayer.push({
    event: 'sendmequotation_today_sign_up',
  })
}
