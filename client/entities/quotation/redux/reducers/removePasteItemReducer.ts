import { boqRowKey } from '../../consts/boqRowKey'
import { itemKey } from '../../consts/itemKey'
import { type Quotation } from '../../types'

export const removePasteItemReducer = (state: Quotation): void => {
  const pasteItemIndex = state.items.findIndex((item) => item.type === itemKey.paste)
  if (pasteItemIndex >= 0) {
    state.items.splice(pasteItemIndex, 1)
  }

  state.items.forEach((item) => {
    if (item.type !== itemKey.boq) return
    const boqRows = item.boq.rows
    const pasteBoqRowIndex = boqRows.findIndex(boqRow => boqRow.type === boqRowKey.paste)
    if (pasteBoqRowIndex >= 0) {
      boqRows.splice(pasteBoqRowIndex, 1)
    }
  })
}
