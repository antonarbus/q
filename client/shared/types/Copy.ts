import type { BoqRow, Item } from './Item'

export type PastePos = 'bottom' | 'middle' | 'top'

export interface CopyPlace {
  itemId: string
  pastePos: PastePos
}
