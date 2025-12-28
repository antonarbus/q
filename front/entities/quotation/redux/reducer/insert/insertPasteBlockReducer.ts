import type { CopyPlace } from '@entities/copy/types'
import type { PayloadAction } from '@reduxjs/toolkit'
import { generateId } from '@root/shared/lib/nanoid'
import { itemType } from '../../../const/itemType'
import type { Quotation } from '@root/shared/types/Quotation'
import type { BlockItem, PasteBlock } from '@root/shared/types/BlockItem'

export const insertPasteBlockReducer = (
  state: Quotation,
  action: PayloadAction<CopyPlace>,
): void => {
  const blocksWithoutPasteText: BlockItem[] = state.blocks.filter(
    (block) => block.type !== itemType.paste,
  )

  if (action.payload.pastePos === 'middle') {
    state.blocks = blocksWithoutPasteText

    return
  }

  const insertAtIndex =
    blocksWithoutPasteText.findIndex(
      (block) => block.id === action.payload.id,
    ) + (action.payload.pastePos === 'bottom' ? 1 : 0)

  const pasteBlock: PasteBlock = {
    id: generateId(),
    name: '',
    category: '',
    desc: '',
    info: '',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    type: itemType.paste,
    email: 'unknown@gmail.com',
    height: 0,
    width: 0,
    preview: '',
    isFroala: true,
  }

  blocksWithoutPasteText.splice(insertAtIndex, 0, pasteBlock)
  state.blocks = blocksWithoutPasteText
}
