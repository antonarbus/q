import type { PayloadAction } from '@reduxjs/toolkit'
import type { ItemsState } from '../../itemsSlice'

export const saveBoqQtyColWidthReducer = (state: ItemsState, action: PayloadAction<{
  index: number
  width: number
}>): void => {
  const { index, width } = action.payload
  const item = state[index]
  if (!item) return
  if (item.type !== 'boq') return
  item.boq.column.qty.width = width
}