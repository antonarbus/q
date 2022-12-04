import { templateOffer } from '@features/offer/templateOffer'

type Props = {
  goUpInMenu: { () : void } | null
  goDownInMenu: { (id: string): void } | null,
  accessJwtToken: string | null
  currentOffer: object
}
export const globalObject: Props = {
  goUpInMenu: () => console.log('put function here for going up the menu, otherwise need to pass it in many props'),
  goDownInMenu: (id) => console.log('same, but for going down the menu'),
  accessJwtToken: '',
  currentOffer: {}
}
