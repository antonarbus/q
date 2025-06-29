import type { PayloadAction } from '@reduxjs/toolkit'
import type { Item, Quotation } from '../../type'

export const reOrderBlocksReducer = (
  state: Quotation,
  action: PayloadAction<{
    reOrderedItems: Item[]
  }>,
): void => {
  const { reOrderedItems } = action.payload
  state.blocks = reOrderedItems
}
