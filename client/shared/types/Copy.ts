import type { TItem } from './Item'

export type TPastePos = 'bottom' | 'middle' | 'top'

export interface ICopyPlace {
  itemId: string
  pastePos: TPastePos
}
export type TCopyItem = TItem & { previewHtml: string }

