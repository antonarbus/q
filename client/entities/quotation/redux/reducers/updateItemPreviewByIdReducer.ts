import type { PayloadAction } from '@reduxjs/toolkit'
import { type Quotation } from '../../types'
import { getItemByIdFromState } from '../getters/getItemByIdFromState'

export const updateItemPreviewByIdReducer = (state: Quotation, action: PayloadAction<{
  id: string
  preview: string
}>): void => {
  const { id, preview } = action.payload
  const item = getItemByIdFromState({ id, state })
  if (item === undefined) return
  item.preview = preview
}
