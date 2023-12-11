import type { PayloadAction } from '@reduxjs/toolkit'
import type { ItemsState } from '../itemsSlice'

export const reRenderTotalPriceReducer = (state: ItemsState, action: PayloadAction<{ itemIndex: number }>): void => {
  const { itemIndex } = action.payload
  const item = state[itemIndex]
  if (item?.type !== 'boq') return
  const reRenderFlag = item.boq.header.price.reRender
  item.boq.header.price.reRender = !reRenderFlag
}
