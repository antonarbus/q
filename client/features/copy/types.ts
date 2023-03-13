import { ItemType } from '../offer/types'

export type CopyPlaceType = { itemId: string, pastePos: 'nowhere' | 'top' | 'middle' | 'bottom' }
export type PasteItemType = CopyPlaceType & { item: ItemType }
