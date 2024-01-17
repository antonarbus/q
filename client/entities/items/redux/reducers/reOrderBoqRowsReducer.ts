import type { PayloadAction } from '@reduxjs/toolkit'
import type { BoqRow } from '@shared/types'
import { getBoqItemFromStore } from '../getters/getBoqItemFromStore'
import type { ItemsState } from '../itemsSlice'

export const reOrderBoqRowsReducer = (state: ItemsState, action: PayloadAction<{
  itemIndex: number
  reOrderedBoqRows: BoqRow[]
}>): ItemsState | undefined => {
  const { reOrderedBoqRows, itemIndex } = action.payload
  const boqItem = getBoqItemFromStore({ itemIndex, state })
  if (boqItem === undefined) return state
  boqItem.boq.rows = reOrderedBoqRows
}
