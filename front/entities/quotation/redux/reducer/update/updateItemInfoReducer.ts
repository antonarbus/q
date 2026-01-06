import type { PayloadAction } from '@reduxjs/toolkit'
import type { Quotation } from '@back/entities/quotation/schemas'
import { getFromState } from '../../getter/getFromState'

export const updateItemInfoReducer = (
  state: Quotation,
  action: PayloadAction<{
    id: string
    name: string
    category: string
    desc: string
    info: string
  }>,
): void => {
  const item = getFromState({ id: action.payload.id, state })

  if (item === undefined) {
    return
  }

  item.name = action.payload.name
  item.category = action.payload.category
  item.desc = action.payload.desc
  item.info = action.payload.info
}
