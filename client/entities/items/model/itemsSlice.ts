import type { PayloadAction } from '@reduxjs/toolkit'
import { createSelector, createSlice, current } from '@reduxjs/toolkit'
import type { RootState } from 'client/app/store'
import { nanoid } from 'nanoid'
import { defaultItems } from './defaultItems'
import { cleanItem } from 'utils/itemsUtils'
import type { CopyPlaceType, PastePosType } from 'client/entities/copy'
import type { TItem, IPasteItem } from './types'
import { jsonParseSafe } from 'utils/jsonParseSafe'

const returnDefaultOrLocalItems = (): TItem[] => {
  const itemsFromLocalStorage = localStorage.getItem('items')
  if (itemsFromLocalStorage === null) return defaultItems
  const items = jsonParseSafe<TItem[]>(itemsFromLocalStorage)
  if (items === undefined) return defaultItems
  return items
}

const initialState: TItem[] = returnDefaultOrLocalItems()

const itemsSlice = createSlice({
  name: 'items',
  initialState,
  reducers: {
    reOrderItems: (state, action: PayloadAction<{ reOrderedItems: TItem[] }>) => {
      const { reOrderedItems } = action.payload
      return reOrderedItems
    },
    deleteItem: (state, action: PayloadAction<{ itemId: string }>) => {
      const { itemId } = action.payload
      const itemsWithoutDeletedOne = state.filter((item) => item.id !== itemId)
      return itemsWithoutDeletedOne
    },
    pasteItem: (state, action: PayloadAction<{
      itemId: string
      pastePos: PastePosType
      item: TItem
    }>) => {
      const { itemId, pastePos, item } = action.payload
      const cleanedItem = cleanItem(item)
      const itemToPaste = { ...cleanedItem, id: nanoid(5) }
      const hoveredItemIndex = state.findIndex(({ id }) => id === itemId)

      interface ISplicingSettings {
        insertAtIndex: number
        deleteCount: number
      }

      const getSpliceSettings = (): ISplicingSettings => {
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
    },
    resetItemsToDefault: () => defaultItems,
    tellItemSavedLocally: (state, action: PayloadAction<{ index: number }>) => {
      const { index } = action.payload
      const item = state[index]
      if (!item) return
      item.msg = 'saved locally'
    },
    removeItemMsg: (state, action: PayloadAction<{ index: number }>) => {
      const { index } = action.payload
      const item = state[index]
      if (!item) return
      item.msg = ''
    },
    saveItemWidth: (state, action: PayloadAction<{ index: number; width: number }>) => {
      const { index, width } = action.payload
      const item = state[index]
      if (!item) return
      item.width = width
    },
    saveItemHeight: (
      state,
      action: PayloadAction<{ index: number; height: number }>,
    ) => {
      const { index, height } = action.payload
      const item = state[index]
      if (!item) return
      item.height = height
    },
    saveText: (state, action: PayloadAction<{
      index: number
      html?: string
      height?: number
      rowIndex?: number
    }>) => {
      const { index, html } = action.payload
      const item = state[index]
      if (!item) return
      if (item.type !== 'text') return
      if (html !== undefined) item.text.html = html
    },
    removePasteItem: (state) => state.filter((item) => item.type !== 'paste'),
    insertPasteItem: (state, action: PayloadAction<CopyPlaceType>) => {
      const { pastePos, itemId } = action.payload
      const itemsWithoutPasteText = state.filter((item) => item.type !== 'paste')
      if (pastePos === 'middle') return itemsWithoutPasteText
      const insertAtIndex = itemsWithoutPasteText.findIndex((item) => item.id === itemId) + (pastePos === 'bottom' ? 1 : 0)

      const pasteTextEl: IPasteItem = {
        id: 'paste id',
        type: 'paste',
        height: 0,
        width: 0,
        msg: '',
        previewHtml: '',
      }

      itemsWithoutPasteText.splice(insertAtIndex, 0, pasteTextEl)
      return itemsWithoutPasteText
    },
  },
})

// exports
export const {
  reOrderItems,
  deleteItem,
  pasteItem,
  resetItemsToDefault,
  tellItemSavedLocally,
  removeItemMsg,
  saveItemWidth,
  saveItemHeight,
  saveText,
  removePasteItem,
  insertPasteItem,
} = itemsSlice.actions
export const itemsReducer = itemsSlice.reducer

// selectors
export const selectIsLastItem = (state: RootState): boolean =>
  state.items.filter((item) => item.type !== 'paste').length === 1

export const selectItemsShape = createSelector(
  [(state: RootState): TItem[] => state.items],
  (items) => items,
  {
    memoizeOptions: {
      // resultEqualityCheck: isEqual
      resultEqualityCheck: (prevItems: TItem[], currentItems: TItem[]) => {
        const addedOrDeletedItem = prevItems.length !== currentItems.length
        if (addedOrDeletedItem) return false
        const itemsIdsDoNotMatch = prevItems.some((item, index) => item.id !== currentItems[index]?.id)
        if (itemsIdsDoNotMatch) return false
        return true
      },
    },
  },
)
