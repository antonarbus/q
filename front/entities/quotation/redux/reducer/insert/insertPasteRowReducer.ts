import type { CopyPlace } from '@entities/copy/types'
import type { PayloadAction } from '@reduxjs/toolkit'
import { rowTypeKey } from '../../../const/rowTypeKey'
import type { Cell, Quotation, Row } from '../../../type'
import { getBoqBlockFromState } from '../../getter/getBoqBlockFromState'

const defaultCellValues: Cell = {
  html: '',
  value: 0,
  pin: {
    isPinned: false,
    isShown: false,
  },
}

const pasteText: Row = {
  id: 'id of boq row paste',
  name: '',
  category: '',
  desc: '',
  info: '',
  createdAt: new Date(),
  updatedAt: new Date(),
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

  for (
    let blockIndex = 0;
    blockIndex < state.blocks.length;
    blockIndex = blockIndex + 1
  ) {
    const boqBlock = getBoqBlockFromState({ blockIndex, state })

    if (boqBlock !== undefined) {
      const rowsWithoutPasteText = boqBlock.boq.rows.filter(
        (row) => row.type === rowTypeKey.row,
      )

      boqBlock.boq.rows = rowsWithoutPasteText

      const rowIndex = rowsWithoutPasteText.findIndex((row) => row.id === id)

      const notInMiddle = rowIndex !== -1 && pastePos !== 'middle'

      if (notInMiddle === true) {
        const insertAtIndex = rowIndex + (pastePos === 'bottom' ? 1 : 0)

        const rowsWithPasteText = rowsWithoutPasteText.toSpliced(
          insertAtIndex,
          0,
          pasteText,
        )

        boqBlock.boq.rows = rowsWithPasteText

        break
      }
    }
  }

  return state
}
