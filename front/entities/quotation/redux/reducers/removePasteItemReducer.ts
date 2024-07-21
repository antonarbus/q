import { boqRowKey } from '../../consts/boqRowKey'
import { itemType } from '../../consts/itemType'
import type { Quotation } from '../../types'

export const removePasteItemReducer = (state: Quotation): void => {
  const pasteBlockIndex = state.blocks.findIndex(
    (block) => block.type === itemType.paste,
  )

  if (pasteBlockIndex >= 0) {
    state.blocks.splice(pasteBlockIndex, 1)
  }

  state.blocks.forEach((block) => {
    if (block.type !== itemType.boq) return

    const boqRows = block.boq.rows

    const pasteBoqRowIndex = boqRows.findIndex(
      (boqRow) => boqRow.type === boqRowKey.paste,
    )

    if (pasteBoqRowIndex >= 0) {
      boqRows.splice(pasteBoqRowIndex, 1)
    }
  })
}
