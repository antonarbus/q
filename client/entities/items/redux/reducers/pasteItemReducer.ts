import type { PayloadAction } from '@reduxjs/toolkit'
import { nanoid } from 'nanoid'
import { type PastePos } from '@entities/copy'
import type { CopyableItem, Item } from '../../types'

type Payload = {
  itemId: string
  newItemId: string
  pastePos: PastePos
  item: CopyableItem
}

type Reducer = (state: Item[], action: PayloadAction<Payload>) => Item[]

export const pasteItemReducer: Reducer = (state, action) => {
  const { itemId, newItemId, pastePos, item } = action.payload
  const itemToPaste = { ...structuredClone(item), id: newItemId }

  if (itemToPaste.type === 'boq') {
    const boqRows = itemToPaste.boq.rows
    boqRows.forEach((boqRow) => {
      boqRow.id = nanoid(3)
    })
  }

  // todo: check it, probably should bring item word into the type and then it will be easier to work with
  // todo: as a next step we may convert type into tags, but that needs a separate experiment
  const isItem = itemToPaste.type === 'boq' || itemToPaste.type === 'text' || itemToPaste.type === 'price'
  const isBoqRow = !isItem

  if (isItem) {
    const hoveredItemIndex = state.findIndex((item) => item.id === itemId)

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

    const itemsWithoutPasteText = state.filter(({ type }) => type !== 'paste')

    itemsWithoutPasteText.splice(
      spliceSettings.insertAtIndex,
      spliceSettings.deleteCount,
      itemToPaste,
    )

    return itemsWithoutPasteText
  }

  if (isBoqRow) {
    state.forEach((item, index) => {
      if (item.type !== 'boq') return

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

      const boqRowsWithoutPasteText = item.boq.rows.filter((boqRow) => boqRow.type !== 'boq paste')

      boqRowsWithoutPasteText.splice(
        spliceSettings.insertAtIndex,
        spliceSettings.deleteCount,
        itemToPaste,
      )

      item.boq.rows = boqRowsWithoutPasteText
    })
  }

  // this never happens, just to let TS happy
  return state
}
