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
    const boqBlock = getBoqBlockFromState({ blockIndex, state })

    if (boqBlock === undefined) {
      continue
    }

    const rowsWithoutPasteText = boqBlock.boq.rows.filter(
      (row) => row.type === rowTypeKey.row,
    )

    boqBlock.boq.rows = rowsWithoutPasteText

    const rowIndex = rowsWithoutPasteText.findIndex((row) => row.id === id)

    if (rowIndex === -1 || pastePos === 'middle') {
      continue
    }

    const insertAtIndex = rowIndex + (pastePos === 'bottom' ? 1 : 0)

    const rowsWithPasteText = rowsWithoutPasteText.toSpliced(
      insertAtIndex,
      0,
      pasteText,
    )

    boqBlock.boq.rows = rowsWithPasteText

    break
  }

  return state
}
