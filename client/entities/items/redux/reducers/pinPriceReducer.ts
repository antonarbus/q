import type { PayloadAction } from '@reduxjs/toolkit'
import type { ItemsState } from '../itemsSlice'
import { getBoqCellFromStore } from '../getters/getBoqCellFromStore'

export const pinPriceReducer = (state: ItemsState, action: PayloadAction<{
  itemIndex: number
  rowIndex: number
}>): void => {
  const { itemIndex, rowIndex } = action.payload
  const priceCell = getBoqCellFromStore({ itemIndex, rowIndex, boqColumnKey: 'price', state })

  if (priceCell === undefined) return
  priceCell.pin.isPinned = !priceCell.pin.isPinned
}
