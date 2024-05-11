import type { PayloadAction } from '@reduxjs/toolkit'
import { type Item, type Quotation } from '../../types'
import { getBoqRowFromState } from '../getters/getBoqRowFromState'
import { getItemFromState } from '../getters/getItemFromState'

export const updateItemInfoReducer = (state: Quotation, action: PayloadAction<{
  item: Item
  itemIndex?: number
  rowIndex?: number
}>): void => {
  const { item, itemIndex, rowIndex } = action.payload

  // update item info in boq row
  if (rowIndex !== undefined && itemIndex !== undefined) {
    const boqRow = getBoqRowFromState({ state, itemIndex, rowIndex })
    if (!boqRow) return
    boqRow.name = item.name
    boqRow.category = item.category
    boqRow.desc = item.desc
    return
  }

  // update item info
  if (itemIndex !== undefined) {
    const currentItem = getItemFromState({ itemIndex, state })
    if (!currentItem) return
    currentItem.name = item.name
    currentItem.category = item.category
    currentItem.desc = item.desc
  }
}
