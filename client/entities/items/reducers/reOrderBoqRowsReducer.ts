import type { PayloadAction } from '@reduxjs/toolkit'
import type { BoqRow } from 'client/shared/types'
import type { ItemsState } from '../redux/itemsSlice'

export const reOrderBoqRowsReducer = (state: ItemsState, action: PayloadAction<{
  itemIndex: number
  reOrderedBoqRows: BoqRow[]
}>): ItemsState | undefined => {
  const { reOrderedBoqRows, itemIndex } = action.payload
  if (state[itemIndex]?.type !== 'boq') return state
  const boqItem = state[itemIndex]
  if (boqItem?.type !== 'boq') return state
  boqItem.boq.rows = reOrderedBoqRows
}
