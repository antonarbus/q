import type { PayloadAction } from '@reduxjs/toolkit'
import type { Quotation } from '../../types'
import { getFromState } from '../getters/getFromState'

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
