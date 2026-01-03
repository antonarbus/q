import type { PayloadAction } from '@reduxjs/toolkit'
import type {
  Quotation,
  BlockItem,
} from '@back/entities/quotation/quotationSchema'

export const reOrderBlocksReducer = (
  state: Quotation,
  action: PayloadAction<{
    reOrderedItems: BlockItem[]
  }>,
): void => {
  state.blocks = action.payload.reOrderedItems
}
