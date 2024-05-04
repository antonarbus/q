import type { PayloadAction } from '@reduxjs/toolkit'
import { type CopyPlace } from '@entities/copy'
import { itemKey } from '../../consts/itemKey'
import type { ItemPaste, Quotation } from '../../types'

export const insertPasteItemReducer = (state: Quotation, action: PayloadAction<CopyPlace>): void => {
  const { pastePos, itemId } = action.payload
  const itemsWithoutPasteText = state.items.filter(item => item.type !== itemKey.paste)

  if (pastePos === 'middle') {
    state.items = itemsWithoutPasteText
    return
  }

  const insertAtIndex = itemsWithoutPasteText.findIndex(item => item.id === itemId) + (pastePos === 'bottom' ? 1 : 0)

  const pasteTextEl: ItemPaste = {
    id: 'paste id',
    type: itemKey.paste,
    email: '',
    name: '',
    category: '',
    height: 0,
    width: 0,
    isFroala: true,
  }

  itemsWithoutPasteText.splice(insertAtIndex, 0, pasteTextEl)
  state.items = itemsWithoutPasteText
}
