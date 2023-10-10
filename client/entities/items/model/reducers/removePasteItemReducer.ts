import type { ItemsState } from '../itemsSlice'

export const removePasteItemReducer = (state: ItemsState): void => {
  const pasteItemIndex = state.findIndex((item) => item.type === 'paste')
  if (pasteItemIndex < 0) return
  state.splice(pasteItemIndex, 1)

  state.forEach((boqItem) => {
    if (boqItem.type === 'boq') {
      const boqRows = boqItem.boq.rows
      const pasteBoqRowIndex = boqRows.findIndex(boqRow => boqRow.type === 'boq paste')
      if (pasteBoqRowIndex < 0) return
      boqRows.splice(pasteBoqRowIndex, 1)
    }
  })
}
