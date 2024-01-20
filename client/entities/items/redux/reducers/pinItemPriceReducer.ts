import type { PayloadAction } from '@reduxjs/toolkit'
import { type Item } from '../../types'
import { getBoqCellFromState } from '../getters/getBoqCellFromState'

export const pinItemPriceReducer = (state: Item[], action: PayloadAction<{
  itemIndex: number
  rowIndex: number
}>): void => {
  const { itemIndex, rowIndex } = action.payload
  const itemPriceCell = getBoqCellFromState({ itemIndex, rowIndex, boqColumnKey: 'itemPrice', state })

  if (itemPriceCell === undefined) return
  itemPriceCell.pin.isPinned = true

  const qtyCell = getBoqCellFromState({ itemIndex, rowIndex, boqColumnKey: 'qty', state })
  if (qtyCell === undefined) return
  qtyCell.pin.isPinned = false
}
