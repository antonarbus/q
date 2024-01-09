import type { PayloadAction } from '@reduxjs/toolkit'
import type { ItemsState } from '../itemsSlice'
import { getBoqItemFromStore } from '../getters/getBoqItemFromStore'

export const deleteBoqRowReducer = (state: ItemsState, action: PayloadAction<{ itemIndex: number, rowIndex: number }>): ItemsState => {
  const { itemIndex, rowIndex } = action.payload
  const boqItem = getBoqItemFromStore({ itemIndex, state })
  if (boqItem === undefined) return state
  const boqRowsWithoutDeletedRow = boqItem.boq.rows.toSpliced(rowIndex, 1)
  boqItem.boq.rows = boqRowsWithoutDeletedRow
  return state
}
