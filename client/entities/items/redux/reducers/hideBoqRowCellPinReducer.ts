import type { PayloadAction } from '@reduxjs/toolkit'
import type { BoqColumnKey, Item } from '@shared/types'
import { getBoqCellFromStore } from '../getters/getBoqCellFromStore'

export const hideBoqRowCellPinReducer = (state: Item[], action: PayloadAction<{
  itemIndex: number
  rowIndex: number
  boqColumnKey: BoqColumnKey
}>): void => {
  const { itemIndex, rowIndex, boqColumnKey } = action.payload
  const boqRowCell = getBoqCellFromStore({ itemIndex, rowIndex, boqColumnKey, state })
  if (boqRowCell === undefined) return
  boqRowCell.pin.isShown = false
}
