import type { TItem } from 'client/entities/items/model/types'

export type TPastePos = 'bottom' | 'middle' | 'top'
export interface ICopyPlace {
  itemId: string
  pastePos: TPastePos
}

export type TCopyItem = TItem & {
  previewHtml?: string
}
