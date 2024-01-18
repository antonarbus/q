import { type Item } from '@shared/types'

export const removePasteItemReducer = (state: Item[]): void => {
  const pasteItemIndex = state.findIndex((item) => item.type === 'paste')
  if (pasteItemIndex >= 0) {
    state.splice(pasteItemIndex, 1)
  }

  state.forEach((boqItem) => {
    if (boqItem.type !== 'boq') return
    const boqRows = boqItem.boq.rows
    const pasteBoqRowIndex = boqRows.findIndex(boqRow => boqRow.type === 'boq paste')
    if (pasteBoqRowIndex >= 0) {
      boqRows.splice(pasteBoqRowIndex, 1)
    }
  })
}
