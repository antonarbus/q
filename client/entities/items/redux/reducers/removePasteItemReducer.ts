import { boqRowType } from '../../consts/boqRowType'
import { itemType } from '../../consts/itemType'
import { type Item } from '../../types'

export const removePasteItemReducer = (state: Item[]): void => {
  const pasteItemIndex = state.findIndex((item) => item.type === itemType.paste)
  if (pasteItemIndex >= 0) {
    state.splice(pasteItemIndex, 1)
  }

  state.forEach((item) => {
    if (item.type !== itemType.boq) return
    const boqRows = item.boq.rows
    const pasteBoqRowIndex = boqRows.findIndex(boqRow => boqRow.type === boqRowType.paste)
    if (pasteBoqRowIndex >= 0) {
      boqRows.splice(pasteBoqRowIndex, 1)
    }
  })
}
