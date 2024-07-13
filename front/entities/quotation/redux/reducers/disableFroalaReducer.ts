import type { PayloadAction } from '@reduxjs/toolkit'
import { type Quotation } from '../../types'

export const disableFroalaReducer = (
  state: Quotation,
  action: PayloadAction<{
    itemIndex: number
  }>,
): void => {
  const { itemIndex } = action.payload
  const block = state.blocks[itemIndex]
  if (block === undefined) return
  block.isFroala = false
}
