import type { PayloadAction } from '@reduxjs/toolkit'
import type { BoqRow, Item } from '@shared/types'
import { getBoqItemFromStore } from '../getters/getBoqItemFromStore'

export const reOrderBoqRowsReducer = (state: Item[], action: PayloadAction<{
  itemIndex: number
  reOrderedBoqRows: BoqRow[]
}>): Item[] | undefined => {
  const { reOrderedBoqRows, itemIndex } = action.payload
  const boqItem = getBoqItemFromStore({ itemIndex, state })
  if (boqItem === undefined) return state
  boqItem.boq.rows = reOrderedBoqRows
}
