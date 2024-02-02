import type { PayloadAction } from '@reduxjs/toolkit'
import { itemType } from '../../consts/itemType'
import type { BoqColumnKey, Item } from '../../types'

export const updateColWidthReducer = (state: Item[], action: PayloadAction<{
  itemIndex: number
  width: number
  boqColumnKey: BoqColumnKey
}>): void => {
  const { itemIndex, width, boqColumnKey } = action.payload
  const item = state[itemIndex]
  if (!item) return
  if (item.type !== itemType.boq) return
  item.boq.column[boqColumnKey].width = width
}
