import { boqRowKey } from '../../consts/boqRowKey'
import { itemType } from '../../consts/itemType'
import { type Quotation } from '../../types'

export const removePasteItemReducer = (state: Quotation): void => {
  const pasteBlockIndex = state.blocks.findIndex(
    (item) => item.type === itemType.paste,
  )

  if (pasteBlockIndex >= 0) {
    state.blocks.splice(pasteBlockIndex, 1)
  }

  state.blocks.forEach((item) => {
    if (item.type !== itemType.boq) return

    const boqRows = item.boq.rows

    const pasteBoqRowIndex = boqRows.findIndex(
      (boqRow) => boqRow.type === boqRowKey.paste,
    )

    if (pasteBoqRowIndex >= 0) {
      boqRows.splice(pasteBoqRowIndex, 1)
    }
  })
}
