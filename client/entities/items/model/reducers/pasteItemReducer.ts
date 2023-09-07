import type { PayloadAction } from '@reduxjs/toolkit'
import type { ItemsState } from '../itemsSlice'
import type { CopyableItem, PastePos } from 'client/shared/types'
import { nanoid } from 'nanoid'
import { cleanItem } from 'client/shared/lib/itemsUtils'

export const pasteItemReducer = (state: ItemsState, action: PayloadAction<{
  itemId: string
  pastePos: PastePos
  item: CopyableItem
}>): ItemsState => {
  const { itemId, pastePos, item } = action.payload
  const cleanedItem = cleanItem(item)
  const itemToPaste = { ...cleanedItem, id: nanoid(5) }
  const hoveredItemIndex = state.findIndex(({ id }) => id === itemId)

  interface SplicingSettings {
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
