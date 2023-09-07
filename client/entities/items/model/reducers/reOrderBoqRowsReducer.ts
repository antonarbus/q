import type { PayloadAction } from '@reduxjs/toolkit'
import type { BoqItem, BoqRow, Item } from 'client/shared/types'
import type { ItemsState } from '../itemsSlice'

export const reOrderBoqRowsReducer = (state: ItemsState, action: PayloadAction<{ itemIndex: number, reOrderedBoqRows: BoqRow[] }>): ItemsState | undefined => {
  const { reOrderedBoqRows, itemIndex } = action.payload
  if (state[itemIndex]?.type !== 'boq') return state
  const boqItem = state[itemIndex] as BoqItem
  boqItem.boq.rows = reOrderedBoqRows
}
