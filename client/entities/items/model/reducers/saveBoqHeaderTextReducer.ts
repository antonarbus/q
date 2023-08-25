import type { PayloadAction } from '@reduxjs/toolkit'
import type { ItemsState } from '../itemsSlice'
import type { BoqHeaderKey } from 'client/shared/types'

export const saveBoqHeaderTextReducer = (state: ItemsState, action: PayloadAction<{
  index: number
  html?: string
  rowIndex?: number
  headerElementName: BoqHeaderKey
}>): void => {
  const { index, html, headerElementName } = action.payload
  const item = state[index]
  if (!item) return
  if (item.type !== 'boq') return
  if (html === undefined) return
  item.boq.header[headerElementName].html = html
}