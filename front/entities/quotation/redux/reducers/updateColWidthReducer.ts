import type { PayloadAction } from '@reduxjs/toolkit'
import { itemKey } from '../../consts/itemKey'
import type { BoqColumnKey, Quotation } from '../../types'

export const updateColWidthReducer = (
  state: Quotation,
  action: PayloadAction<{
    itemIndex: number
    width: number
    boqColumnKey: BoqColumnKey
  }>,
): void => {
  const { itemIndex, width, boqColumnKey } = action.payload
  const item = state.items[itemIndex]

  if (!item) return
  if (item.type !== itemKey.boq) return

  item.boq.column[boqColumnKey].width = width
}
