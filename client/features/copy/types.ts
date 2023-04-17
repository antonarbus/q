import { ItemType } from '../items/types'

export type PastePosType = 'top' | 'middle' | 'bottom'
export type CopyPlaceType = { itemId: string, pastePos: PastePosType }
export type CopyItemType = ItemType & { previewHtml: string }
