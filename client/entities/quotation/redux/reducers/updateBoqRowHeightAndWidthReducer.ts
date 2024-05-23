import type { PayloadAction } from '@reduxjs/toolkit'
import { type Quotation } from '../../types'
import { getBoqRowFromState } from '../getters/getBoqRowFromState'

export const updateBoqRowHeightAndWidthReducer = (
  state: Quotation,
  action: PayloadAction<{
    itemIndex: number
    rowIndex: number
    height: number
    width: number
  }>,
): void => {
  const { itemIndex, rowIndex, height, width } = action.payload
  const boqRow = getBoqRowFromState({ itemIndex, rowIndex, state })
  if (boqRow === undefined) return
  boqRow.height = height
  boqRow.width = width
}
