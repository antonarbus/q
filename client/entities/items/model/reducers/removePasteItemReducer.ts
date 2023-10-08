import type { ItemsState } from '../itemsSlice'

export const removePasteItemReducer = (state: ItemsState): void => {
  const itemsWithoutPaste = state.filter((item) => item.type !== 'paste')

  itemsWithoutPaste.forEach((item) => {
    if (item.type === 'boq') {
      const boqItem = item
      boqItem.boq.rows = boqItem.boq.rows.filter(boqRow => boqRow.type !== 'boq paste')
    }
  })

  // return itemsWithoutPaste
}
