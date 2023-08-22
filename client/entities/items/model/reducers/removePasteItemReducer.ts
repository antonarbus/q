import type { ItemsState } from '../itemsSlice'

export const removePasteItemReducer = (state: ItemsState): ItemsState => {
  const itemsWithoutPaste = state.filter((item) => item.type !== 'paste')
  return itemsWithoutPaste
}