import { ItemType } from '../items/types'

export type CopyPlaceType = { itemId: string, pastePos: 'top' | 'middle' | 'bottom' }
export type CopyItemType = CopyPlaceType & { item: ItemType & { previewHtml: string } }
