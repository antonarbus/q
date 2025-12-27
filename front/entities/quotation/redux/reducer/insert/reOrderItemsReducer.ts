import type { PayloadAction } from '@reduxjs/toolkit'
import type { Quotation } from '@root/shared/types/Quotation'
import type { BlockItem } from '@root/shared/types/BlockItem'

export const reOrderBlocksReducer = (
  state: Quotation,
  action: PayloadAction<{
    reOrderedItems: BlockItem[]
  }>,
): void => {
  state.blocks = action.payload.reOrderedItems
}
