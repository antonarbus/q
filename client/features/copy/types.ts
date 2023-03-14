import { ItemType } from '../items/types'

export type CopyPlaceType = { itemId: string, pastePos: 'top' | 'middle' | 'bottom' }
export type PasteItemType = CopyPlaceType & { item: ItemType }
