import type { PastePos } from '@front/entities/copy/types'
import type { PayloadAction } from '@reduxjs/toolkit'
import { generateId } from '@front/shared/lib/nanoid/generateId'
import type { BlockItem, Quotation, RowBlock } from '@back/entity/quotation/schema'

type SpliceSettings = {
  insertAtIndex: number
  deleteCount: number
}

const calculateSpliceSettings = (baseIndex: number, pastePos: PastePos): SpliceSettings => {
  if (pastePos === 'top') {
    return {
      insertAtIndex: baseIndex,
      deleteCount: 0,
    }
  }

  if (pastePos === 'bottom') {
    return {
      insertAtIndex: baseIndex + 1,
      deleteCount: 0,
    }
  }

  // Middle position - replace the item at this index
  return {
    insertAtIndex: baseIndex,
    deleteCount: 1,
  }
}

const prepareItemForPasting = (item: BlockItem, newItemId: string): BlockItem => {
  const clonedItem: BlockItem = { ...structuredClone(item), id: newItemId }

  if (clonedItem.type === 'boq') {
    for (const row of clonedItem.boq.rows) {
      row.id = generateId()
    }
  }

  return clonedItem
}

const isBlockType = (item: BlockItem): boolean => {
  const isBoq = item.type === 'boq'
  const isText = item.type === 'text'
  const isPrice = item.type === 'price'
  const isBlock = isBoq || isText || isPrice

  return isBlock
}

const pasteBlock = (
  state: Quotation,
  id: string,
  pastePos: PastePos,
  itemToPaste: BlockItem,
): void => {
  const hoveredItemIndex = state.blocks.findIndex((block) => block.id === id)
  const spliceSettings = calculateSpliceSettings(hoveredItemIndex, pastePos)

  state.blocks.splice(spliceSettings.insertAtIndex, spliceSettings.deleteCount, itemToPaste)
}

const pasteRow = (
  state: Quotation,
  id: string,
  pastePos: PastePos,
  itemToPaste: RowBlock,
): void => {
  const boqBlocks = state.blocks.filter((block) => block.type === 'boq')

  for (const block of boqBlocks) {
    const rowIndex = block.boq.rows.findIndex((row) => row.id === id)
    const rowFound = rowIndex !== -1

    if (rowFound === true) {
      const spliceSettings = calculateSpliceSettings(rowIndex, pastePos)

      block.boq.rows.splice(spliceSettings.insertAtIndex, spliceSettings.deleteCount, itemToPaste)

      return
    }
  }
}

export const pasteItem = (
  state: Quotation,
  action: PayloadAction<{
    id: string
    newItemId: string
    pastePos: PastePos
    item: BlockItem
  }>,
): void => {
  const itemToPaste = prepareItemForPasting(action.payload.item, action.payload.newItemId)

  const isBlock = isBlockType(itemToPaste)

  if (isBlock === true) {
    pasteBlock(state, action.payload.id, action.payload.pastePos, itemToPaste)

    return
  }

  const isRow = itemToPaste.type === 'row'

  if (isRow === true) {
    pasteRow(state, action.payload.id, action.payload.pastePos, itemToPaste)
  }
}
