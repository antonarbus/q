import type { PayloadAction } from '@reduxjs/toolkit'
import { boqRowCellKey } from '../../consts/boqRowCellKey'
import { type Item } from '../../types'
import { getBoqCellFromState } from '../getters/getBoqCellFromState'

export const pinPriceReducer = (state: Item[], action: PayloadAction<{
  itemIndex: number
  rowIndex: number
}>): void => {
  const { itemIndex, rowIndex } = action.payload
  const priceCell = getBoqCellFromState({ itemIndex, rowIndex, boqRowCellKey: boqRowCellKey.price, state })

  if (priceCell === undefined) return
  priceCell.pin.isPinned = !priceCell.pin.isPinned
}
