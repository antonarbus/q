import type { PayloadAction } from '@reduxjs/toolkit'
import { type Quotation } from '../../types'

export const deleteBlockReducer = (
  state: Quotation,
  action: PayloadAction<{
    itemId: string
  }>,
): undefined => {
  const { itemId } = action.payload
  const blocksWithoutDeletedOne = state.blocks.filter(
    (block) => block.id !== itemId,
  )
  state.blocks = blocksWithoutDeletedOne
}
