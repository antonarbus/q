import type { CopyPlace } from '@entities/copy/types'
import type { PayloadAction } from '@reduxjs/toolkit'
import { generateId } from '@shared/lib/nanoid'
import { itemType } from '../../../const/itemType'
import type { Quotation } from '../../../types/Quotation'
import type { BlockItem, Paste } from '../../../types/BlockItem'

export const insertPasteBlockReducer = (
  state: Quotation,
  action: PayloadAction<CopyPlace>,
): void => {
  const { pastePos, id } = action.payload

  const blocksWithoutPasteText: BlockItem[] = state.blocks.filter(
    (block) => block.type !== itemType.paste,
  )

  if (pastePos === 'middle') {
    state.blocks = blocksWithoutPasteText

    return
  }

  const insertAtIndex =
    blocksWithoutPasteText.findIndex((block) => block.id === id) +
    (pastePos === 'bottom' ? 1 : 0)

  const pasteBlock: Paste = {
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
    isFroala: true,
  }

  blocksWithoutPasteText.splice(insertAtIndex, 0, pasteBlock)
  state.blocks = blocksWithoutPasteText
}
