import type { PayloadAction } from '@reduxjs/toolkit'
import type { PastePos } from '@entities/copy'
import { nanoid } from '@shared/lib/nanoid'
import { boqRowKey } from '../../consts/boqRowKey'
import { itemType } from '../../consts/itemType'
import type { Item, Quotation } from '../../types'

export const pasteItemReducer = (
  state: Quotation,
  action: PayloadAction<{
    id: string
    newItemId: string
    pastePos: PastePos
    item: Item
  }>,
): void => {
  const { id, newItemId, pastePos, item } = action.payload

  const itemToPaste: Item = { ...structuredClone(item), id: newItemId }

  if (itemToPaste.type === itemType.boq) {
    const boqRows = itemToPaste.boq.rows

    boqRows.forEach((boqRow) => {
      boqRow.id = nanoid(5)
    })
  }

  const isBlock =
    itemToPaste.type === itemType.boq ||
    itemToPaste.type === itemType.text ||
    itemToPaste.type === itemType.price

  const isBoqRow = itemToPaste.type === itemType.row

  if (isBlock) {
    const hoveredItemIndex = state.blocks.findIndex((block) => block.id === id)

    type SplicingSettings = {
      insertAtIndex: number
      deleteCount: number
    }

    const getSpliceSettings = (): SplicingSettings => {
      const spliceSettings = {
        insertAtIndex: hoveredItemIndex,
        deleteCount: 0,
      }

      if (pastePos === 'top') {
        spliceSettings.insertAtIndex--

        return spliceSettings
      }

      if (pastePos === 'bottom') {
        spliceSettings.insertAtIndex++

        return spliceSettings
      }

      spliceSettings.deleteCount++

      return spliceSettings
    }

    const spliceSettings = getSpliceSettings()

    const blocksWithoutPasteText = state.blocks.filter(
      (block) => block.type !== itemType.paste,
    )

    blocksWithoutPasteText.splice(
      spliceSettings.insertAtIndex,
      spliceSettings.deleteCount,
      itemToPaste,
    )

    state.blocks = blocksWithoutPasteText

    return
  }

  if (isBoqRow) {
    state.blocks.forEach((block) => {
      if (block.type !== itemType.boq) {
        return
      }

      type SplicingSettings = {
        insertAtIndex: number
        deleteCount: number
      }

      const spliceSettings = {
        insertAtIndex: -1,
        deleteCount: 0,
      }

      block.boq.rows.forEach((boqRow, hoveredItemIndex) => {
        if (boqRow.id !== id) {
          return
        }

        const getSpliceSettings = (): SplicingSettings => {
          const spliceParams: SplicingSettings = {
            insertAtIndex: hoveredItemIndex,
            deleteCount: 0,
          }

          if (pastePos === 'top') {
            spliceParams.insertAtIndex--

            return spliceParams
          }

          if (pastePos === 'bottom') {
            spliceParams.insertAtIndex++

            return spliceParams
          }

          spliceParams.deleteCount++

          return spliceParams
        }

        spliceSettings.insertAtIndex = getSpliceSettings().insertAtIndex
        spliceSettings.deleteCount = getSpliceSettings().deleteCount
      })

      const boqRowsWithoutPasteText = block.boq.rows.filter(
        (boqRow) => boqRow.type !== boqRowKey.paste,
      )

      boqRowsWithoutPasteText.splice(
        spliceSettings.insertAtIndex,
        spliceSettings.deleteCount,
        itemToPaste,
      )

      block.boq.rows = boqRowsWithoutPasteText
    })
  }
}
