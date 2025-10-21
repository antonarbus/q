import { itemType } from '../../../const/itemType'
import { rowTypeKey } from '../../../const/rowTypeKey'
import type { Quotation } from '../../../type'

export const removePasteItemReducer = (state: Quotation): void => {
  const pasteBlockIndex = state.blocks.findIndex(
    (block) => block.type === itemType.paste,
  )

  if (pasteBlockIndex >= 0) {
    state.blocks.splice(pasteBlockIndex, 1)
  }

  state.blocks.forEach((block) => {
    if (block.type !== itemType.boq) {
      return
    }

    const rows = block.boq.rows

    const pasteRowIndex = rows.findIndex((row) => row.type === rowTypeKey.paste)

    if (pasteRowIndex >= 0) {
      rows.splice(pasteRowIndex, 1)
    }
  })
}
