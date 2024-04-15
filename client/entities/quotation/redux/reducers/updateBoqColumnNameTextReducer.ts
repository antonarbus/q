import type { PayloadAction } from '@reduxjs/toolkit'
import { itemKey } from '../../consts/itemKey'
import type { BoqColumnKey, Quotation } from '../../types'

export const updateBoqColumnNameTextReducer = (state: Quotation, action: PayloadAction<{
  itemIndex: number
  html: string
  boqColumnKey: BoqColumnKey
}>): void => {
  const { itemIndex, html, boqColumnKey } = action.payload
  const item = state.items[itemIndex]

  if (!item) return
  if (item.type !== itemKey.boq) return

  item.boq.column[boqColumnKey].html = html
}
