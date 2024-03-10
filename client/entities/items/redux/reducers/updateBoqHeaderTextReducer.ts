import type { PayloadAction } from '@reduxjs/toolkit'
import { itemKey } from '../../consts/itemKey'
import type { BoqHeaderKey, Item } from '../../types'

export const updateBoqHeaderTextReducer = (state: Item[], action: PayloadAction<{
  itemIndex: number
  html: string
  value: number
  boqHeaderKey: BoqHeaderKey
}>): void => {
  const { itemIndex, html, boqHeaderKey, value } = action.payload

  const item = state[itemIndex]
  if (!item) return
  if (item.type !== itemKey.boq) return
  if (html === undefined) return

  item.boq.header[boqHeaderKey].html = html
  item.boq.header[boqHeaderKey].value = value
}
