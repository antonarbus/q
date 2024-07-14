import type { PayloadAction } from '@reduxjs/toolkit'
import { type Quotation } from '../../types'

export const deleteBlockReducer = (
  state: Quotation,
  action: PayloadAction<{
    id: string
  }>,
): undefined => {
  const { id } = action.payload
  const blocksWithoutDeletedOne = state.blocks.filter(
    (block) => block.id !== id,
  )
  state.blocks = blocksWithoutDeletedOne
}
