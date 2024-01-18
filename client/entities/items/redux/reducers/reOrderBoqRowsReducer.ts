import type { PayloadAction } from '@reduxjs/toolkit'
import type { BoqRow, Item } from '@shared/types'
import { getBoqItemFromState } from '../getters/getBoqItemFromState'

export const reOrderBoqRowsReducer = (state: Item[], action: PayloadAction<{
  itemIndex: number
  reOrderedBoqRows: BoqRow[]
}>): Item[] | undefined => {
  const { reOrderedBoqRows, itemIndex } = action.payload
  const boqItem = getBoqItemFromState({ itemIndex, state })
  if (boqItem === undefined) return state
  boqItem.boq.rows = reOrderedBoqRows
}
