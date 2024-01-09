import type { PayloadAction } from '@reduxjs/toolkit'
import type { ItemsState } from '../itemsSlice'
import type { BoqColumnKey } from 'client/shared/types'
import { getBoqRowCellFromStore } from '../getters/getBoqRowCellFromStore'

export const hideBoqRowCellPinReducer = (state: ItemsState, action: PayloadAction<{
  itemIndex: number
  rowIndex: number
  boqColumnKey: BoqColumnKey
}>): void => {
  const { itemIndex, rowIndex, boqColumnKey } = action.payload
  const boqRowCell = getBoqRowCellFromStore({ itemIndex, rowIndex, boqColumnKey, state })
  if (boqRowCell === undefined) return
  boqRowCell.pin.isShown = false
}
