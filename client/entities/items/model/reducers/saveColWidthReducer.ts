import type { PayloadAction } from '@reduxjs/toolkit'
import type { BoqColWidth, BoqCols } from 'client/shared/types'
import type { ItemsState } from '../itemsSlice'

export const saveColWidthReducer = (state: ItemsState, action: PayloadAction<{
  itemIndex: number
  width: BoqColWidth
  headerName: keyof BoqCols
}>): void => {
  const { itemIndex, width, headerName: colKey } = action.payload
  const item = state[itemIndex]
  if (!item) return
  if (item.type !== 'boq') return
  item.boq.column[colKey].width = width
}
