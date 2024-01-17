import type { PayloadAction } from '@reduxjs/toolkit'
import { getBoqCellFromStore } from '../getters/getBoqCellFromStore'
import type { ItemsState } from '../itemsSlice'

export const pinQtyReducer = (state: ItemsState, action: PayloadAction<{
  itemIndex: number
  rowIndex: number
}>): void => {
  const { itemIndex, rowIndex } = action.payload
  const itemPriceCell = getBoqCellFromStore({ itemIndex, rowIndex, boqColumnKey: 'itemPrice', state })

  if (itemPriceCell === undefined) return
  itemPriceCell.pin.isPinned = false

  const qtyCell = getBoqCellFromStore({ itemIndex, rowIndex, boqColumnKey: 'qty', state })
  if (qtyCell === undefined) return
  qtyCell.pin.isPinned = true
}
