import type { CopyPlace } from '@entities/copy/types'
import type { PayloadAction } from '@reduxjs/toolkit'
import { rowTypeKey } from '../../const/rowTypeKey'
import type { Quotation, Row, RowCell } from '../../type'
import { getBoqBlockFromState } from '../getter/getBoqBlockFromState'

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
  type: rowTypeKey.paste,
  email: 'john@mail.com',
  height: 0,
  width: 0,
  description: defaultCellValues,
  itemPrice: defaultCellValues,
  qty: defaultCellValues,
  price: defaultCellValues,
}

type Type = (state: Quotation, action: PayloadAction<CopyPlace>) => Quotation

export const insertPasteRowReducer: Type = (state, action) => {
  const { pastePos, id } = action.payload

  for (let blockIndex = 0; blockIndex < state.blocks.length; blockIndex++) {
    const boqItem = getBoqBlockFromState({ blockIndex, state })

    if (boqItem === undefined) {
      continue
    }

    const boqRowsWithoutPasteText = boqItem.boq.rows.filter(
      (row) => row.type === rowTypeKey.row,
    )

    boqItem.boq.rows = boqRowsWithoutPasteText

    const boqRowIndex = boqRowsWithoutPasteText.findIndex(
      (row) => row.id === id,
    )

    if (boqRowIndex === -1 || pastePos === 'middle') {
      continue
    }

    const insertAtIndex = boqRowIndex + (pastePos === 'bottom' ? 1 : 0)

    const boqRowsWithPasteText = boqRowsWithoutPasteText.toSpliced(
      insertAtIndex,
      0,
      pasteText,
    )

    boqItem.boq.rows = boqRowsWithPasteText

    break
  }

  return state
}
