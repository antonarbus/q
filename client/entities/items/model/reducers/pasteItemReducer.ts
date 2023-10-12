import type { PayloadAction } from '@reduxjs/toolkit'
import type { ItemsState } from '../itemsSlice'
import type { CopyableItem, PastePos } from 'client/shared/types'
import { nanoid } from 'nanoid'

type Payload = {
  itemId: string
  pastePos: PastePos
  item: CopyableItem
}

type Reducer = (state: ItemsState, action: PayloadAction<Payload>) => ItemsState

export const pasteItemReducer: Reducer = (state, action) => {
  const { itemId, pastePos, item } = action.payload
  const itemToPaste = { ...structuredClone(item), id: nanoid(3) }

  if (itemToPaste.type === 'boq') {
    const boqRows = itemToPaste.boq.rows
    boqRows.forEach((boqRow) => {
      boqRow.id = nanoid(3)
    })
  }

  const isItem = itemToPaste.type === 'boq' || itemToPaste.type === 'text'
  const isBoqRow = !isItem

  if (isItem) {
    const hoveredItemIndex = state.findIndex(({ id }) => id === itemId)

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

      console.log({ item, index })

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
