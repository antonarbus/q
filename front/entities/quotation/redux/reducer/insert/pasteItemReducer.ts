import type { PastePos } from '@entities/copy/types'
import type { PayloadAction } from '@reduxjs/toolkit'
import { generateId } from '@shared/lib/nanoid'
import { itemType } from '../../../const/itemType'
import { rowTypeKey } from '../../../const/rowTypeKey'
import type { BlockItem, Quotation, Row } from '../../../type'

type SpliceSettings = {
  insertAtIndex: number
  deleteCount: number
}

const calculateSpliceSettings = (
  baseIndex: number,
  pastePos: PastePos,
): SpliceSettings => {
  if (pastePos === 'top') {
    return {
      insertAtIndex: baseIndex - 1,
      deleteCount: 0,
    }
  }

  if (pastePos === 'bottom') {
    return {
      insertAtIndex: baseIndex + 1,
      deleteCount: 0,
    }
  }

  return {
    insertAtIndex: baseIndex,
    deleteCount: 1,
  }
}

const prepareItemForPasting = (
  item: BlockItem,
  newItemId: string,
): BlockItem => {
  const clonedItem: BlockItem = { ...structuredClone(item), id: newItemId }

  if (clonedItem.type === itemType.boq) {
    clonedItem.boq.rows.forEach((row) => {
      row.id = generateId()
    })
  }

  return clonedItem
}

const isBlockType = (item: BlockItem): boolean => {
  const isBoq = item.type === itemType.boq
  const isText = item.type === itemType.text
  const isPrice = item.type === itemType.price
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

  const blocksWithoutPaste = state.blocks.filter(
    (block) => block.type !== itemType.paste,
  )

  blocksWithoutPaste.splice(
    spliceSettings.insertAtIndex,
    spliceSettings.deleteCount,
    itemToPaste,
  )

  state.blocks = blocksWithoutPaste
}

const pasteRow = (
  state: Quotation,
  id: string,
  pastePos: PastePos,
  itemToPaste: Row,
): void => {
  const boqBlocks = state.blocks.filter((block) => block.type === itemType.boq)

  for (const block of boqBlocks) {
    const rowIndex = block.boq.rows.findIndex((row) => row.id === id)
    const rowFound = rowIndex !== -1

    if (rowFound === true) {
      const spliceSettings = calculateSpliceSettings(rowIndex, pastePos)

      const rowsWithoutPaste = block.boq.rows.filter(
        (row) => row.type !== rowTypeKey.paste,
      )

      rowsWithoutPaste.splice(
        spliceSettings.insertAtIndex,
        spliceSettings.deleteCount,
        itemToPaste,
      )

      block.boq.rows = rowsWithoutPaste

      return
    }
  }
}

export const pasteItemReducer = (
  state: Quotation,
  action: PayloadAction<{
    id: string
    newItemId: string
    pastePos: PastePos
    item: BlockItem
  }>,
): void => {
  const { id, newItemId, pastePos, item } = action.payload
  const itemToPaste = prepareItemForPasting(item, newItemId)
  const isBlock = isBlockType(itemToPaste)

  if (isBlock === true) {
    pasteBlock(state, id, pastePos, itemToPaste)

    return
  }

  const isRow = itemToPaste.type === itemType.row

  if (isRow === true) {
    pasteRow(state, id, pastePos, itemToPaste)
  }
}
