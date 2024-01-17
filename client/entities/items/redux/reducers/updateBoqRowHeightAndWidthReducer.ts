import type { PayloadAction } from '@reduxjs/toolkit'
import { getBoqRowFromStore } from '../getters/getBoqRowFromStore'
import type { ItemsState } from '../itemsSlice'

export const updateBoqRowHeightAndWidthReducer = (state: ItemsState, action: PayloadAction<{
  itemIndex: number
  rowIndex: number
  height: number
  width: number
}>): void => {
  const { itemIndex, rowIndex, height, width } = action.payload
  const boqRow = getBoqRowFromStore({ itemIndex, rowIndex, state })
  if (boqRow === undefined) return
  boqRow.height = height
  boqRow.width = width
}
