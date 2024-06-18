import type { PayloadAction } from '@reduxjs/toolkit'
import { type CopyPlace } from '@entities/copy'
import { nanoid } from '@shared/lib/nanoid'
import { itemKey } from '../../consts/itemKey'
import type { ItemPaste, Quotation } from '../../types'

export const insertPasteItemReducer = (
  state: Quotation,
  action: PayloadAction<CopyPlace>,
): void => {
  const { pastePos, itemId } = action.payload
  const itemsWithoutPasteText = state.items.filter(
    (item) => item.type !== itemKey.paste,
  )

  if (pastePos === 'middle') {
    state.items = itemsWithoutPasteText
    return
  }

  const insertAtIndex =
    itemsWithoutPasteText.findIndex((item) => item.id === itemId) +
    (pastePos === 'bottom' ? 1 : 0)

  const pasteTextEl: ItemPaste = {
    id: nanoid(3),
    type: itemKey.paste,
    height: 0,
    width: 0,
    isFroala: true,
  }

  itemsWithoutPasteText.splice(insertAtIndex, 0, pasteTextEl)
  state.items = itemsWithoutPasteText
}
