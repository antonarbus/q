import { itemType } from '../../../const/itemType'
import { rowTypeKey } from '../../../const/rowTypeKey'
import type { Quotation } from '@root/shared/types/Quotation'

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

    const pasteRowIndex = block.boq.rows.findIndex(
      (row) => row.type === rowTypeKey.paste,
    )

    if (pasteRowIndex >= 0) {
      block.boq.rows.splice(pasteRowIndex, 1)
    }
  })
}
