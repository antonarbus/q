import type { PayloadAction } from '@reduxjs/toolkit'
import { type Quotation } from '../../types'
import { getItemByIdFromState } from '../getters/getItemByIdFromState'

export const updateItemInfoByIdReducer = (state: Quotation, action: PayloadAction<{
  id: string
  name: string
  category: string
  desc: string
  info: string
}>): void => {
  const { id, name, category, desc, info } = action.payload

  const item = getItemByIdFromState({ id, state })

  if (item === undefined) return

  item.name = name
  item.category = category
  item.desc = desc
  item.info = info
}
