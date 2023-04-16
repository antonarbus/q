import { PayloadAction, createSelector, createSlice, current } from '@reduxjs/toolkit'
import { hideCopyContainer, pasteItem, updatePasteTextPos } from 'client/features/copy/copySlice'
import { getItemsFromLocalStorage } from 'client/modules/localStorage'
import { RootState } from 'client/store'
import { nanoid } from 'nanoid'
import { CopyPlaceType } from '../copy/types'
import { defaultItems } from './defaultItems'
import { ItemBoqType, ItemType, ItemsType } from './types'
import { cleanItem } from 'utils/itemsUtils'
// import isEqual from 'lodash.isequal'

const initialState: ItemsType = getItemsFromLocalStorage()

const itemsSlice = createSlice({
  name: 'items',
  initialState,
  reducers: {
    saveItemsOrder: (state, action) => action.payload.sortedItems,
    deleteItem: (state, action) => state.filter(item => item.id !== action.payload.id),
    resetItemsToDefault: () => defaultItems,
    tellItemSavedLocally: (state, action: PayloadAction<{index: number}>) => {
      const { index } = action.payload
      state[index].msg = 'saved locally'
    },
    removeItemMsg: (state, action: PayloadAction<{index: number}>) => {
      const { index } = action.payload
      state[index].msg = ''
    },
    saveItemWidth: (state, action: PayloadAction<{index: number, width: number}>) => {
      const { index, width } = action.payload
      state[index].width = width
    },
    saveItem: (state, action: PayloadAction<{index: number, height: number, html: string}>) => {
      const { index, height, html } = action.payload
      state[index].height = height
      state[index].html = html
    },
    saveBoqHeaderTitle: (state, action: PayloadAction<{index: number, height: number, html: string}>) => {
      const { index, height, html } = action.payload
      const boqItem = state[index] as ItemBoqType
      boqItem.boq.header.title.height = height
      boqItem.boq.header.title.html = html
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(updatePasteTextPos, (state, action: PayloadAction<CopyPlaceType>) => {
        // respond to updatePastePos() action of copySlice, takes current state slice, but action.payload comes from copySlice
        const { pastePos, itemId } = action.payload
        const itemsWithoutPasteText = state.filter(item => item.type !== 'paste')
        if (pastePos === 'middle') return itemsWithoutPasteText
        // debugger
        const insertAtIndex = itemsWithoutPasteText.findIndex(item => item.id === itemId) + (pastePos === 'bottom' ? 1 : 0)
        const pasteTextEl: ItemType = { id: 'paste id', type: 'paste', width: 0, height: 0, html: '', msg: '' }
        itemsWithoutPasteText.splice(insertAtIndex, 0, pasteTextEl)
        return itemsWithoutPasteText
      })
      .addCase(hideCopyContainer, (state) => state.filter(item => item.type !== 'paste'))
      .addCase(pasteItem, (state, action) => {
        const { itemId, pastePos, item } = action.payload
        const cleanedItem = cleanItem(item)
        const itemToPaste = { ...cleanedItem, id: nanoid(5) }
        const hoveredItemIndex = state.findIndex(item => item.id === itemId)

        const getSpliceSettings = () => {
          const spliceSettings = { insertAtIndex: hoveredItemIndex, deleteCount: 0 }
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
        const itemsWithoutPasteText = state.filter(item => item.type !== 'paste')
        itemsWithoutPasteText.splice(spliceSettings.insertAtIndex, spliceSettings.deleteCount, itemToPaste)
        return itemsWithoutPasteText
      })
  }
})

// exports
export const {
  saveItemsOrder,
  deleteItem,
  resetItemsToDefault,
  tellItemSavedLocally,
  removeItemMsg,
  saveItemWidth,
  saveItem,
  saveBoqHeaderTitle
} = itemsSlice.actions
export default itemsSlice.reducer

// selectors
export const selectIsLastItem = (state: RootState) => state.items.filter((item) => item.type !== 'paste').length === 1

export const selectItemsShape = createSelector(
  [(state: RootState) => state.items],
  (items) => items,
  {
    memoizeOptions: {
      // resultEqualityCheck: isEqual
      resultEqualityCheck: (prevItems:ItemsType, currentItems:ItemsType) => {
        const addedOrDeletedItem = prevItems.length !== currentItems.length
        if (addedOrDeletedItem) return false
        const itemsIdsDoNotMatch = prevItems.some((item, index) => item.id !== currentItems[index]?.id)
        if (itemsIdsDoNotMatch) return false
        return true
      }
    }
  }
)
