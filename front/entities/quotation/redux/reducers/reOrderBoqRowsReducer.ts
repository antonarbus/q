import type { PayloadAction } from '@reduxjs/toolkit'
import type { Row, Quotation } from '../../types'
import { getBoqItemFromState } from '../getters/getBoqItemFromState'

export const reOrderBoqRowsReducer = (
  state: Quotation,
  action: PayloadAction<{
    itemIndex: number
    reOrderedBoqRows: Row[]
  }>,
): Quotation | undefined => {
  const { reOrderedBoqRows, itemIndex } = action.payload
  const boqItem = getBoqItemFromState({ itemIndex, state })
  if (boqItem === undefined) return state
  boqItem.boq.rows = reOrderedBoqRows
}
