import type { PayloadAction } from '@reduxjs/toolkit'
import type { Quotation } from '@back/entity/quotation/schema'
import { getFromState } from '../../getter/getFromState'

export const updateItemPreviewReducer = (
  state: Quotation,
  action: PayloadAction<{
    id: string
    preview: string
  }>,
): void => {
  const item = getFromState({ id: action.payload.id, state })

  if (item === undefined) {
    return
  }

  if (item.type === 'quotation') {
    return
  }

  item.preview = action.payload.preview
}
