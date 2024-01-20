import type { PayloadAction } from '@reduxjs/toolkit'
import { type Item } from '../../types'
import { getBoqItemFromState } from '../getters/getBoqItemFromState'

export const deleteBoqRowReducer = (state: Item[], action: PayloadAction<{ itemIndex: number, rowIndex: number }>): Item[] => {
  const { itemIndex, rowIndex } = action.payload
  const boqItem = getBoqItemFromState({ itemIndex, state })
  if (boqItem === undefined) return state
  const boqRowsWithoutDeletedRow = boqItem.boq.rows.toSpliced(rowIndex, 1)
  boqItem.boq.rows = boqRowsWithoutDeletedRow
  return state
}
