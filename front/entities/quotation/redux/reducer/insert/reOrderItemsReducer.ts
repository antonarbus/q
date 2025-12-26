import type { PayloadAction } from '@reduxjs/toolkit'
import type { BlockItem, Quotation } from '../../../type'

export const reOrderBlocksReducer = (
  state: Quotation,
  action: PayloadAction<{
    reOrderedItems: BlockItem[]
  }>,
): void => {
  const { reOrderedItems } = action.payload
  state.blocks = reOrderedItems
}
