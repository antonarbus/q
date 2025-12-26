import type { PayloadAction } from '@reduxjs/toolkit'
import type { Quotation } from '../../../types/Quotation'
import type { BlockItem } from '../../../types/BlockItem'

export const reOrderBlocksReducer = (
  state: Quotation,
  action: PayloadAction<{
    reOrderedItems: BlockItem[]
  }>,
): void => {
  const { reOrderedItems } = action.payload
  state.blocks = reOrderedItems
}
