import type { PayloadAction } from '@reduxjs/toolkit'
import { type Quotation } from '../../types'

export const deleteItemReducer = (
  state: Quotation,
  action: PayloadAction<{
    itemId: string
  }>,
): undefined => {
  const { itemId } = action.payload
  const itemsWithoutDeletedOne = state.items.filter(
    (item) => item.id !== itemId,
  )
  state.items = itemsWithoutDeletedOne
}
