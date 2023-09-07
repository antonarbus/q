import type { PayloadAction } from '@reduxjs/toolkit'
import type { ItemsState } from '../itemsSlice'

export const saveBoqRowHeightAndWidthReducer = (state: ItemsState, action: PayloadAction<{
  index: number
  rowIndex: number
  height: number
  width: number
}>): void => {
  const { index, rowIndex, height, width } = action.payload
  const item = state[index]
  if (item?.type !== 'boq') return
  const boqRow = item.boq.rows[rowIndex]
  if (!boqRow) return
  boqRow.height = height
  boqRow.width = width
}
