import type { PayloadAction } from '@reduxjs/toolkit'
import type { ItemsState } from '../redux/itemsSlice'

export const updateBoqRowHeightAndWidthReducer = (state: ItemsState, action: PayloadAction<{
  itemIndex: number
  rowIndex: number
  height: number
  width: number
}>): void => {
  const { itemIndex, rowIndex, height, width } = action.payload
  const item = state[itemIndex]
  if (item?.type !== 'boq') return
  const boqRow = item.boq.rows[rowIndex]
  if (!boqRow) return
  boqRow.height = height
  boqRow.width = width
}
