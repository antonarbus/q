import type { PayloadAction } from '@reduxjs/toolkit'
import type { ItemsState } from '../itemsSlice'
import { getBoqCellFromStore } from '../getters/getBoqCellFromStore'

export const pinItemPriceReducer = (state: ItemsState, action: PayloadAction<{
  itemIndex: number
  rowIndex: number
}>): void => {
  const { itemIndex, rowIndex } = action.payload
  const itemPriceCell = getBoqCellFromStore({ itemIndex, rowIndex, boqColumnKey: 'itemPrice', state })

  if (itemPriceCell === undefined) return
  itemPriceCell.pin.isPinned = true

  const qtyCell = getBoqCellFromStore({ itemIndex, rowIndex, boqColumnKey: 'qty', state })
  if (qtyCell === undefined) return
  qtyCell.pin.isPinned = false
}
