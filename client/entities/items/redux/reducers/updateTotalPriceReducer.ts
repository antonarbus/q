import type { PayloadAction } from '@reduxjs/toolkit'
import { type Item } from '@shared/types'
import { getBoqItemFromState } from '../getters/getBoqItemFromState'

export const updateSubTotalPriceReducer = (state: Item[], action: PayloadAction<{
  itemIndex: number
  value: number
  html: string
}>): void => {
  const { itemIndex, html, value } = action.payload
  const boqItem = getBoqItemFromState({ itemIndex, state })
  if (boqItem === undefined) return
  boqItem.boq.header.subTotalPrice.value = value
  boqItem.boq.header.subTotalPrice.html = html
}
