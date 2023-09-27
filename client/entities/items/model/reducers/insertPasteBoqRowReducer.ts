/* eslint-disable @typescript-eslint/prefer-for-of */
import type { PayloadAction } from '@reduxjs/toolkit'
import type { ItemsState } from '../itemsSlice'
import type { BoqItem, BoqRow, CopyPlace, PasteItem } from 'client/shared/types'
import { current } from '@reduxjs/toolkit'

export const insertPasteBoqRowReducer = (state: ItemsState, action: PayloadAction<CopyPlace>): ItemsState => {
  const { pastePos, itemId } = action.payload
  console.log('🚀  { pastePos, itemId }:', { pastePos, itemId })

  state.forEach((item, itemIndex) => {
    if (item.type !== 'boq') return state
    const boqRowsWithoutPasteText = item.boq.rows.filter(boqRow => boqRow.type === 'boq row')
    item.boq.rows = boqRowsWithoutPasteText

    boqRowsWithoutPasteText.forEach((boqRow, boqRowIndex) => {
      if (boqRow.id !== itemId) return state
      if (pastePos === 'middle') return state

      const insertAtIndex = boqRowIndex + (pastePos === 'bottom' ? 1 : 0)
      const boqItem = state[itemIndex]
      if (boqItem?.type !== 'boq') return state

      const pasteText: BoqRow = {
        id: 'id of boq row paste',
        type: 'boq paste',
        height: 0,
        width: 0,
        number: { html: '', value: 0 },
        description: { html: '' },
        item: { html: '', value: 0 },
        qty: { html: '', value: 0 },
        price: { html: '', value: 0 },
      }

      const boqRowsWithPasteText = boqRowsWithoutPasteText.toSpliced(insertAtIndex, 0, pasteText)
      boqItem.boq.rows = boqRowsWithPasteText
      return state
    })

    return state
  })

  return state
}
