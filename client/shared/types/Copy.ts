import type { Item } from './Item'

export type PastePos = 'bottom' | 'middle' | 'top'

export interface CopyPlace {
  itemId: string
  pastePos: PastePos
}
export type CopyItem = Item & { previewHtml: string }
