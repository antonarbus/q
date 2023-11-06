import type { PayloadAction } from '@reduxjs/toolkit'
import type { ItemsState } from '../itemsSlice'

export const deleteBoqRowReducer = (state: ItemsState, action: PayloadAction<{ itemIndex: number, rowIndex: number }>): ItemsState => {
  const { itemIndex, rowIndex } = action.payload

  const boqItem = state[itemIndex]

  if (boqItem?.type !== 'boq') return state

  const boqRows = boqItem.boq.rows
  const boqRowsWithoutDeletedRow = boqRows.toSpliced(rowIndex, 1)
  boqItem.boq.rows = boqRowsWithoutDeletedRow

  return state
}
