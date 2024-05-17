import type { PayloadAction } from '@reduxjs/toolkit'
import { type Quotation } from '../../types'
import { getItemByIdFromState } from '../getters/getItemByIdFromState'

export const updateItemInfoByIdReducer = (state: Quotation, action: PayloadAction<{
  id: string
  info: string
}>): void => {
  const { id, info } = action.payload
  const item = getItemByIdFromState({ id, state })
  if (item === undefined) return
  item.info = info
}
