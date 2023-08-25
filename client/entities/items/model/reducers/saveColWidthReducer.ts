import type { PayloadAction } from '@reduxjs/toolkit'
import type { BoqCols } from 'client/shared/types'
import type { ItemsState } from '../itemsSlice'

export const saveColWidthReducer = (state: ItemsState, action: PayloadAction<{
  index: number
  width: number
  headerName: keyof BoqCols
}>): void => {
  const { index, width, headerName: colKey } = action.payload
  const item = state[index]
  if (!item) return
  if (item.type !== 'boq') return
  item.boq.column[colKey].width = width
}