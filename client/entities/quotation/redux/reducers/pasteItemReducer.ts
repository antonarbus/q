import type { PayloadAction } from '@reduxjs/toolkit'
import { type PastePos } from '@entities/copy'
import { nanoid } from '@shared/lib/nanoid'
import { boqRowKey } from '../../consts/boqRowKey'
import { itemKey } from '../../consts/itemKey'
import type { CopyableItem, Quotation } from '../../types'

type Payload = {
  itemId: string
  newItemId: string
  pastePos: PastePos
  item: CopyableItem
}

type Reducer = (state: Quotation, action: PayloadAction<Payload>) => void

export const pasteItemReducer: Reducer = (state, action) => {
  const { itemId, newItemId, pastePos, item } = action.payload
  const itemToPaste = { ...structuredClone(item), id: newItemId }

  if (itemToPaste.type === itemKey.boq) {
    const boqRows = itemToPaste.boq.rows
    boqRows.forEach((boqRow) => {
      boqRow.id = nanoid(5)
    })
  }

  // todo: check it, probably should bring item word into the type and then it will be easier to work with
  // todo: as a next step we may convert type into tags, but that needs a separate experiment
  const isItem = itemToPaste.type === itemKey.boq || itemToPaste.type === itemKey.text || itemToPaste.type === itemKey.price
  const isBoqRow = !isItem

  if (isItem) {
    const hoveredItemIndex = state.items.findIndex(item => item.id === itemId)

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

    const itemsWithoutPasteText = state.items.filter(({ type }) => type !== itemKey.paste)

    itemsWithoutPasteText.splice(
      spliceSettings.insertAtIndex,
      spliceSettings.deleteCount,
      itemToPaste,
    )

    state.items = itemsWithoutPasteText
    return
  }

  if (isBoqRow) {
    state.items.forEach((item, index) => {
      if (item.type !== itemKey.boq) return

      type SplicingSettings = {
        insertAtIndex: number
        deleteCount: number
      }

      let spliceSettings: SplicingSettings | undefined

      item.boq.rows.forEach((boqRow, hoveredItemIndex) => {
        if (boqRow.id !== itemId) return

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

        spliceSettings = getSpliceSettings()
      })

      if (spliceSettings === undefined) return

      const boqRowsWithoutPasteText = item.boq.rows.filter(boqRow => boqRow.type !== boqRowKey.paste)

      boqRowsWithoutPasteText.splice(
        spliceSettings.insertAtIndex,
        spliceSettings.deleteCount,
        itemToPaste,
      )

      item.boq.rows = boqRowsWithoutPasteText
    })
  }
}
