import type { Item } from 'client/entities/items/model/types'

export type PastePosType = 'bottom' | 'middle' | 'top'
export interface CopyPlaceType { itemId: string; pastePos: PastePosType }
export type CopyItemType = Item & { previewHtml?: string }
