import type { PayloadAction } from '@reduxjs/toolkit'
import type { BoqRow } from 'client/shared/types'
import type { ItemsState } from '../itemsSlice'
import { getBoqItemFromStore } from '../getters/getBoqItemFromStore'

export const reOrderBoqRowsReducer = (state: ItemsState, action: PayloadAction<{
  itemIndex: number
  reOrderedBoqRows: BoqRow[]
}>): ItemsState | undefined => {
  const { reOrderedBoqRows, itemIndex } = action.payload
  const boqItem = getBoqItemFromStore({ itemIndex, state })
  if (boqItem === undefined) return state
  boqItem.boq.rows = reOrderedBoqRows
}
