import type { PayloadAction } from '@reduxjs/toolkit'
import { type CopyPlace } from '@entities/copy'
import { nanoid } from '@shared/lib/nanoid'
import { itemType } from '../../consts/itemType'
import type { Block, PasteBlock, Quotation } from '../../types'

export const insertPasteBlockReducer = (
  state: Quotation,
  action: PayloadAction<CopyPlace>,
): void => {
  const { pastePos, id } = action.payload

  const blocksWithoutPasteText: Block[] = state.blocks.filter(
    (block) => block.type !== itemType.paste,
  )

  if (pastePos === 'middle') {
    state.blocks = blocksWithoutPasteText
    return
  }

  const insertAtIndex =
    blocksWithoutPasteText.findIndex((block) => block.id === id) +
    (pastePos === 'bottom' ? 1 : 0)

  const pasteBlock: PasteBlock = {
    id: nanoid(3),
    type: itemType.paste,
    email: 'john@mail.com',
    height: 0,
    width: 0,
    isFroala: true,
  }

  blocksWithoutPasteText.splice(insertAtIndex, 0, pasteBlock)
  state.blocks = blocksWithoutPasteText
}
