import type { PayloadAction } from '@reduxjs/toolkit'
import type { ItemsState } from '../itemsSlice'
import type { BoqRow, BoqRowCell, CopyPlace } from 'client/shared/types'
import { getBoqItem } from '../getters/getBoqItem'

const defaultCellValues: BoqRowCell = {
  html: '',
  value: 0,
  pin: {
    isPinned: false,
    isShown: false,
  },
}

const pasteText: BoqRow = {
  id: 'id of boq row paste',
  type: 'boq paste',
  height: 0,
  width: 0,
  number: defaultCellValues,
  description: defaultCellValues,
  itemPrice: defaultCellValues,
  qty: defaultCellValues,
  price: defaultCellValues,

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
