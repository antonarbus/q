import type { PayloadAction } from '@reduxjs/toolkit'
import type { Quotation } from '../../types'
import { getItemFromState } from '../getters/getItemFromState'

export const updateItemPreviewReducer = (
  state: Quotation,
  action: PayloadAction<{
    id: string
    preview: string
  }>,
): void => {
  const { id, preview } = action.payload
  const item = getItemFromState({ id, state })
  if (item === undefined) return
  item.preview = preview
}
