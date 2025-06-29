import type { PayloadAction } from '@reduxjs/toolkit'
import type { Quotation } from '../../type'
import { getFromState } from '../getter/getFromState'

export const updateItemPreviewReducer = (
  state: Quotation,
  action: PayloadAction<{
    id: string
    preview: string
  }>,
): void => {
  const { id, preview } = action.payload
  const item = getFromState({ id, state })

  if (item === undefined) {
    return
  }

  item.preview = preview
}
