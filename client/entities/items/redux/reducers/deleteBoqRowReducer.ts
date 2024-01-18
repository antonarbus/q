import type { PayloadAction } from '@reduxjs/toolkit'
import { type Item } from '@shared/types'
import { getBoqItemFromStore } from '../getters/getBoqItemFromStore'

export const deleteBoqRowReducer = (state: Item[], action: PayloadAction<{ itemIndex: number, rowIndex: number }>): Item[] => {
  const { itemIndex, rowIndex } = action.payload
  const boqItem = getBoqItemFromStore({ itemIndex, state })
  if (boqItem === undefined) return state
  const boqRowsWithoutDeletedRow = boqItem.boq.rows.toSpliced(rowIndex, 1)
  boqItem.boq.rows = boqRowsWithoutDeletedRow
  return state
}
