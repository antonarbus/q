import type { PayloadAction } from '@reduxjs/toolkit'
import type { Block, Quotation } from '../../types'

export const reOrderItemsReducer = (
  state: Quotation,
  action: PayloadAction<{
    reOrderedItems: Block[]
  }>,
): void => {
  const { reOrderedItems } = action.payload
  state.items = reOrderedItems
}
