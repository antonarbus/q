import type { PayloadAction } from '@reduxjs/toolkit'
import type { BoqItem, BoqRow, Item } from 'client/shared/types'
import type { ItemsState } from '../itemsSlice'

export const reOrderBoqRowsReducer = (state: ItemsState, action: PayloadAction<{ index: number, reOrderedBoqRows: BoqRow[] }>): ItemsState => {
  const { reOrderedBoqRows, index } = action.payload
  if (state[index]?.type !== 'boq') return state
  const boqItem = state[index] as BoqItem
  boqItem.boq.rows = reOrderedBoqRows
}
