export type EventType = KeyboardEvent | MouseEvent | React.MouseEvent | React.KeyboardEvent | React.FormEvent
export type HttpStatusType = 'loading' | 'error' | 'success' | ''
export type JwtAccessTokenType = { email: string, roles: string[] }
export type { ItemType } from 'client/offer/templateOffer'
export type { OfferType } from 'client/offer/templateOffer'
export type CopyPlaceType= { itemId: string, pastePos: 'nowhere' | 'top' | 'middle' | 'bottom' }
