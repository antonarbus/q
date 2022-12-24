import { OfferType, templateOffer } from '@src/offer/templateOffer'

// put template offer or offer stored in localStorage into global variable
const currentOffer =
  localStorage.getItem('currentOffer') === null
    ? { ...templateOffer }
    : JSON.parse(localStorage.getItem('currentOffer') || '')

type Props = {
  goUpInMenu: { () : void } | null
  goDownInMenu: { (id: string): void } | null,
  accessJwtToken: string | null
  currentOffer: OfferType
}
export const globalObject: Props = {
  goUpInMenu: () => console.log('put function here for going up the menu, otherwise need to pass it in many props'),
  goDownInMenu: (id) => console.log('same, but for going down the menu'),
  accessJwtToken: '',
  currentOffer
}
