import type { PayloadAction } from '@reduxjs/toolkit'
import { type PastePos } from '@entities/copy'
import { nanoid } from '@shared/lib/nanoid'
import { boqRowKey } from '../../consts/boqRowKey'
import { itemType } from '../../consts/itemType'
import type { Item, Quotation } from '../../types'

type Payload = {
  id: string
  newItemId: string
  pastePos: PastePos
  item: Item
}

type Reducer = (state: Quotation, action: PayloadAction<Payload>) => void

export const pasteItemReducer: Reducer = (state, action) => {
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
      ({ type }) => type !== itemType.paste,
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
      if (block.type !== itemType.boq) return

      type SplicingSettings = {
        insertAtIndex: number
        deleteCount: number
      }

      let spliceSettings: SplicingSettings | null = null

      block.boq.rows.forEach((boqRow, hoveredItemIndex) => {
        if (boqRow.id !== id) return

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

        spliceSettings = getSpliceSettings()
      })

      if (spliceSettings === null) return

      const boqRowsWithoutPasteText = block.boq.rows.filter(
        (boqRow) => boqRow.type !== boqRowKey.paste,
      )

      boqRowsWithoutPasteText.splice(
        (spliceSettings as SplicingSettings).insertAtIndex,
        (spliceSettings as SplicingSettings).deleteCount,
        itemToPaste,
      )

      block.boq.rows = boqRowsWithoutPasteText
    })
  }
}

export const splitName = (): string[] | undefined => {
  let stringOrNull: string | null = null
  stringOrNull = 'string'
  if (stringOrNull === null) return
  const letters = stringOrNull.split('')
  return letters
}
