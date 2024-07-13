import type { PayloadAction } from '@reduxjs/toolkit'
import type { Block, Quotation } from '../../types'

export const reOrderBlocksReducer = (
  state: Quotation,
  action: PayloadAction<{
    reOrderedItems: Block[]
  }>,
): void => {
  const { reOrderedItems } = action.payload
  state.blocks = reOrderedItems
}
