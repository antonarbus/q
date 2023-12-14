import type { PayloadAction } from '@reduxjs/toolkit'
import type { ItemsState } from '../redux/itemsSlice'
import { type BoqRow } from 'client/shared/types'
import { getTextContentFromHtml } from 'client/shared/lib'

export const updateTotalPriceReducer = (state: ItemsState, action: PayloadAction<{ itemIndex: number }>): void => {
  const { itemIndex } = action.payload
  const item = state[itemIndex]
  if (item?.type !== 'boq') return

  const totalPrice: number = item.boq.rows.reduce((accumulator: number, boqRow: BoqRow) => {
    const price = boqRow.price.value
    return accumulator + price
  }, 0)

  const htmlValue = getTextContentFromHtml({ html: item.boq.header.price.html })
  const updatedHtml = item.boq.header.price.html.replace(String(htmlValue), String(totalPrice))

  item.boq.header.price.value = totalPrice
  item.boq.header.price.html = updatedHtml
}
