import type { PayloadAction } from '@reduxjs/toolkit'
import type { BoqColumnKey } from '@shared/types'
import type { ItemsState } from '../itemsSlice'

export const updateColWidthReducer = (state: ItemsState, action: PayloadAction<{
  itemIndex: number
  width: number
  boqColumnKey: BoqColumnKey
}>): void => {
  const { itemIndex, width, boqColumnKey } = action.payload
  const item = state[itemIndex]
  if (!item) return
  if (item.type !== 'boq') return
  item.boq.column[boqColumnKey].width = width
}
