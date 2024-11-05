import type { PayloadAction } from '@reduxjs/toolkit'
import type { CopyPlace } from '@entities/copy'
import { boqRowKey } from '../../consts/boqRowKey'
import type { Row, RowCell, Quotation } from '../../types'
import { getBoqBlockFromState } from '../getters/getBoqBlockFromState'

const defaultCellValues: RowCell = {
  html: '',
  value: 0,
  pin: {
    isPinned: false,
    isShown: false,
  },
}

const pasteText: Row = {
  id: 'id of boq row paste',
  type: boqRowKey.paste,
  email: 'john@mail.com',
  height: 0,
  width: 0,
  description: defaultCellValues,
  itemPrice: defaultCellValues,
  qty: defaultCellValues,
  price: defaultCellValues,
}

type Type = (state: Quotation, action: PayloadAction<CopyPlace>) => Quotation

export const insertPasteBoqRowReducer: Type = (state, action) => {
  const { pastePos, id } = action.payload

  state.blocks.forEach((block, blockIndex) => {
    const boqItem = getBoqBlockFromState({ blockIndex, state })
    if (boqItem === undefined) return state

    const boqRowsWithoutPasteText = boqItem.boq.rows.filter(
      (boqRow) => boqRow.type === boqRowKey.row,
    )
    boqItem.boq.rows = boqRowsWithoutPasteText

    boqRowsWithoutPasteText.forEach((boqRow, boqRowIndex) => {
      if (boqRow.id !== id) return state
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
