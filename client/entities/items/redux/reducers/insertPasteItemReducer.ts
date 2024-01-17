import type { PayloadAction } from '@reduxjs/toolkit'
import type { CopyPlace, PasteItem } from '@shared/types'
import type { ItemsState } from '../itemsSlice'

export const insertPasteItemReducer = (state: ItemsState, action: PayloadAction<CopyPlace>): ItemsState => {
  const { pastePos, itemId } = action.payload
  const itemsWithoutPasteText = state.filter((item) => item.type !== 'paste')
  if (pastePos === 'middle') return itemsWithoutPasteText
  const insertAtIndex = itemsWithoutPasteText.findIndex((item) => item.id === itemId) + (pastePos === 'bottom' ? 1 : 0)

  const pasteTextEl: PasteItem = {
    id: 'paste id',
    type: 'paste',
    height: 0,
    width: 0,
    msg: '',
    isFroala: true,
  }

  itemsWithoutPasteText.splice(insertAtIndex, 0, pasteTextEl)
  return itemsWithoutPasteText
}
