import type { PayloadAction } from '@reduxjs/toolkit'
import type { BoqColumnKey, BoqRowCellKey, Item } from '../../types'
import { getBoqCellFromState } from '../getters/getBoqCellFromState'

export const hideBoqRowCellPinReducer = (state: Item[], action: PayloadAction<{
  itemIndex: number
  rowIndex: number
  boqRowCellKey: BoqRowCellKey
}>): void => {
  const { itemIndex, rowIndex, boqRowCellKey } = action.payload
  const boqRowCell = getBoqCellFromState({ itemIndex, rowIndex, boqRowCellKey, state })
  if (boqRowCell === undefined) return
  boqRowCell.pin.isShown = false
}
