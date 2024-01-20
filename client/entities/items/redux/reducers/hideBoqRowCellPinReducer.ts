import type { PayloadAction } from '@reduxjs/toolkit'
import type { BoqColumnKey, Item } from '../../types'
import { getBoqCellFromState } from '../getters/getBoqCellFromState'

export const hideBoqRowCellPinReducer = (state: Item[], action: PayloadAction<{
  itemIndex: number
  rowIndex: number
  boqColumnKey: BoqColumnKey
}>): void => {
  const { itemIndex, rowIndex, boqColumnKey } = action.payload
  const boqRowCell = getBoqCellFromState({ itemIndex, rowIndex, boqColumnKey, state })
  if (boqRowCell === undefined) return
  boqRowCell.pin.isShown = false
}
