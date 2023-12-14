import type { PayloadAction } from '@reduxjs/toolkit'
import type { BoqColWidth, BoqColumnKey } from 'client/shared/types'
import type { ItemsState } from '../redux/itemsSlice'

export const saveColWidthReducer = (state: ItemsState, action: PayloadAction<{
  itemIndex: number
  width: BoqColWidth
  boqColumnKey: BoqColumnKey
}>): void => {
  const { itemIndex, width, boqColumnKey } = action.payload
  const item = state[itemIndex]
  if (!item) return
  if (item.type !== 'boq') return
  item.boq.column[boqColumnKey].width = width
}
