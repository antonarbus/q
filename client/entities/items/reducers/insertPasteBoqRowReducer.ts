import type { PayloadAction } from '@reduxjs/toolkit'
import type { ItemsState } from '../redux/itemsSlice'
import type { BoqRow, CopyPlace } from 'client/shared/types'
import { getBoqItem } from '../utils/getBoqItem'

const pasteText: BoqRow = {
  id: 'id of boq row paste',
  type: 'boq paste',
  height: 0,
  width: 0,
  number: { html: '', value: 0 },
  description: { html: '', value: null },
  itemPrice: { html: '', value: 0 },
  qty: { html: '', value: 0 },
  price: { html: '', value: 0 },
}

type Type = (state: ItemsState, action: PayloadAction<CopyPlace>) => ItemsState

export const insertPasteBoqRowReducer: Type = (state, action) => {
  const { pastePos, itemId } = action.payload

  state.forEach((item, itemIndex) => {
    const boqItem = getBoqItem({ itemIndex, state })
    if (boqItem === undefined) return state

    const boqRowsWithoutPasteText = boqItem.boq.rows.filter(boqRow => boqRow.type === 'boq row')
    boqItem.boq.rows = boqRowsWithoutPasteText

    boqRowsWithoutPasteText.forEach((boqRow, boqRowIndex) => {
      if (boqRow.id !== itemId) return state
      if (pastePos === 'middle') return state
      const insertAtIndex = boqRowIndex + (pastePos === 'bottom' ? 1 : 0)
      const boqRowsWithPasteText = boqRowsWithoutPasteText.toSpliced(insertAtIndex, 0, pasteText)
      boqItem.boq.rows = boqRowsWithPasteText
      return state
    })

    return state
  })

  return state
}
