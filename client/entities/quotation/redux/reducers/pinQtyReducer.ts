import type { PayloadAction } from '@reduxjs/toolkit'
import { boqRowCellKey } from '../../consts/boqRowCellKey'
import { type Item } from '../../types'
import { getBoqCellFromState } from '../getters/getBoqCellFromState'

export const pinQtyReducer = (state: Item[], action: PayloadAction<{
  itemIndex: number
  rowIndex: number
}>): void => {
  const { itemIndex, rowIndex } = action.payload

  const itemPriceCell = getBoqCellFromState({ itemIndex, rowIndex, boqRowCellKey: boqRowCellKey.itemPrice, state })
  if (itemPriceCell === undefined) return
  itemPriceCell.pin.isPinned = false

  const qtyCell = getBoqCellFromState({ itemIndex, rowIndex, boqRowCellKey: boqRowCellKey.qty, state })
  if (qtyCell === undefined) return
  qtyCell.pin.isPinned = true
}
