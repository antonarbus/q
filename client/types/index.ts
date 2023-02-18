export type EventType = KeyboardEvent | MouseEvent | React.MouseEvent | React.KeyboardEvent | React.FormEvent
export type HttpStatusType = 'loading' | 'error' | 'success' | ''
export type JwtAccessTokenType = { email: string, roles: string[] }
export type ItemType = { id: string, type: 'text' | 'paste', width: number, height: number, innerHtml: string }
export type OfferType = { items: ItemType[] }
export type CopyPlaceType= { itemId: string, pastePos: 'nowhere' | 'top' | 'middle' | 'bottom' }
