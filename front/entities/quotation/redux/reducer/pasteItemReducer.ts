import type { PastePos } from '@entities/copy'
import type { PayloadAction } from '@reduxjs/toolkit'
import { generateId } from '@shared/lib/nanoid'
import { boqRowKey } from '../../const/boqRowKey'
import { itemType } from '../../const/itemType'
import type { Item, Quotation } from '../../type'

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
      boqRow.id = generateId()
    })
  }

  const isBlock =
    itemToPaste.type === itemType.boq ||
    itemToPaste.type === itemType.text ||
    itemToPaste.type === itemType.price

  const isBoqRow = itemToPaste.type === itemType.row

  if (isBlock === true) {
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
        spliceSettings.insertAtIndex = spliceSettings.insertAtIndex - 1

        return spliceSettings
      }

      if (pastePos === 'bottom') {
        spliceSettings.insertAtIndex = spliceSettings.insertAtIndex + 1

        return spliceSettings
      }

      spliceSettings.deleteCount = spliceSettings.deleteCount + 1

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

  if (isBoqRow === true) {
    state.blocks.forEach((block) => {
      if (block.type !== itemType.boq) {
        return
      }

      type SplicingSettings = {
        insertAtIndex: number
        deleteCount: number
      }

      let spliceSettings: SplicingSettings | null = null

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
            spliceParams.insertAtIndex = spliceParams.insertAtIndex - 1

            return spliceParams
          }

          if (pastePos === 'bottom') {
            spliceParams.insertAtIndex = spliceParams.insertAtIndex + 1

            return spliceParams
          }

          spliceParams.deleteCount = spliceParams.deleteCount + 1

          return spliceParams
        }

        spliceSettings = getSpliceSettings()
      })

      if ((spliceSettings as SplicingSettings | null) === null) {
        return
      }

      const boqRowsWithoutPasteText = block.boq.rows.filter(
        (boqRow) => boqRow.type !== boqRowKey.paste,
      )

      // todo: fix it
      boqRowsWithoutPasteText.splice(
        // @ts-expect-error: some error
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        spliceSettings.insertAtIndex,
        // @ts-expect-error: some error
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        spliceSettings.deleteCount,
        itemToPaste,
      )

      block.boq.rows = boqRowsWithoutPasteText
    })
  }
}
