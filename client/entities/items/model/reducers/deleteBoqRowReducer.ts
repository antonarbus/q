import type { PayloadAction } from '@reduxjs/toolkit'
import type { ItemsState } from '../itemsSlice'

export const deleteBoqRowReducer = (state: ItemsState, action: PayloadAction<{ boqRowId: string }>): ItemsState => {
  const { boqRowId } = action.payload

  state.forEach((item, itemIndex) => {
    if (item.type !== 'boq') {
      return state
    }

    const boqRowsWithoutPasteText = item.boq.rows.filter(boqRow => boqRow.type === 'boq row')
    item.boq.rows = boqRowsWithoutPasteText

    boqRowsWithoutPasteText.forEach((boqRow, boqRowIndex) => {
      if (boqRow.id !== boqRowId) {
        return state
      }

      const boqItem = state[itemIndex]

      if (boqItem?.type !== 'boq') {
        return state
      }

      const boqRowsWithoutDeletedRow = boqRowsWithoutPasteText.toSpliced(boqRowIndex, 1)
      boqItem.boq.rows = boqRowsWithoutDeletedRow
      return state
    })

    return state
  })

  return state
}
