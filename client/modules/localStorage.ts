import { store } from 'client/store'
import { jsonSafeParse } from 'utils/jsonSafeParse'

export const getOfferFromLocalStorage = () => {
  return jsonSafeParse(localStorage.getItem('currentOffer'))
}

export const saveOfferIntoLocalStorage = () => {
  const offer = store.getState().offer
  localStorage.setItem('currentOffer', JSON.stringify(offer))
}
