import type { PayloadAction } from '@reduxjs/toolkit'
import { type Item } from '../../types'

export const showMsgAboveItemReducer = (state: Item[], action: PayloadAction<{
  itemIndex: number
  msg: string
}>): void => {
  const { itemIndex, msg } = action.payload
  const item = state[itemIndex]
  if (!item) return
  item.msg = msg
}
