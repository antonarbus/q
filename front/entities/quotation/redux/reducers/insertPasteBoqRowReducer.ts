import type { PayloadAction } from '@reduxjs/toolkit'
import { type CopyPlace } from '@entities/copy'
import { boqRowKey } from '../../consts/boqRowKey'
import type { BoqRow, BoqRowCell, Quotation } from '../../types'
import { getBoqBlockFromState } from '../getters/getBoqBlockFromState'

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
  type: boqRowKey.paste,
  height: 0,
  width: 0,
  description: defaultCellValues,
  itemPrice: defaultCellValues,
  qty: defaultCellValues,
  price: defaultCellValues,
}

type Type = (state: Quotation, action: PayloadAction<CopyPlace>) => Quotation

export const insertPasteBoqRowReducer: Type = (state, action) => {
  const { pastePos, itemId } = action.payload

  state.blocks.forEach((item, itemIndex) => {
    const boqItem = getBoqBlockFromState({ itemIndex, state })
    if (boqItem === undefined) return state

    const boqRowsWithoutPasteText = boqItem.boq.rows.filter(
      (boqRow) => boqRow.type === boqRowKey.row,
    )
    boqItem.boq.rows = boqRowsWithoutPasteText

    boqRowsWithoutPasteText.forEach((boqRow, boqRowIndex) => {
      if (boqRow.id !== itemId) return state
      if (pastePos === 'middle') return state
      const insertAtIndex = boqRowIndex + (pastePos === 'bottom' ? 1 : 0)
      const boqRowsWithPasteText = boqRowsWithoutPasteText.toSpliced(
        insertAtIndex,
        0,
        pasteText,
      )
      boqItem.boq.rows = boqRowsWithPasteText
      return state
    })

    return state
  })

  return state
}
