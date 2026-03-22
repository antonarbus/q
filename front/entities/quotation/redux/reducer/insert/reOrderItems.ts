import type { PayloadAction } from '@reduxjs/toolkit'
import type { Quotation, BlockItem } from '@back/entity/quotation/schema'

export const reOrderBlocks = (
  state: Quotation,
  action: PayloadAction<{
    reOrderedItems: BlockItem[]
  }>,
): void => {
  state.blocks = action.payload.reOrderedItems
}
