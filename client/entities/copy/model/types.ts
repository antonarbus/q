import { Item } from 'client/entities/items/model/types'

export type PastePosType = 'top' | 'middle' | 'bottom'
export type CopyPlaceType = { itemId: string; pastePos: PastePosType }
export type CopyItemType = Item & { previewHtml: string }
