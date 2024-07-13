import type { PayloadAction } from '@reduxjs/toolkit'
import { type CopyPlace } from '@entities/copy'
import { nanoid } from '@shared/lib/nanoid'
import { itemKey } from '../../consts/itemKey'
import type { Block, BlockPaste, Quotation } from '../../types'

export const insertPasteItemReducer = (
  state: Quotation,
  action: PayloadAction<CopyPlace>,
): void => {
  const { pastePos, itemId } = action.payload

  const blocksWithoutPasteText: Block[] = state.items.filter(
    (block) => block.type !== itemKey.paste,
  )

  if (pastePos === 'middle') {
    state.items = blocksWithoutPasteText
    return
  }

  const insertAtIndex =
    blocksWithoutPasteText.findIndex((block) => block.id === itemId) +
    (pastePos === 'bottom' ? 1 : 0)

  const pasteBlock: BlockPaste = {
    id: nanoid(3),
    type: itemKey.paste,
    height: 0,
    width: 0,
    isFroala: true,
  }

  blocksWithoutPasteText.splice(insertAtIndex, 0, pasteBlock)
  state.items = blocksWithoutPasteText
}
