import { PayloadAction, createSelector, createSlice, current } from '@reduxjs/toolkit'
import { hideCopyContainer, pasteItem, updatePasteTextPos } from 'client/features/copy/copySlice'
import { getItemsFromLocalStorage } from 'client/modules/localStorage'
import { RootState } from 'client/store'
import { nanoid } from 'nanoid'
import { CopyPlaceType } from '../copy/types'
import { defaultItems } from './defaultItems'
import { ItemBoqType, ItemPasteType, ItemsType } from './types'
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
      const item = state[index]
      item.msg = 'saved locally'
    },
    removeItemMsg: (state, action: PayloadAction<{index: number}>) => {
      const { index } = action.payload
      const item = state[index]
      item.msg = ''
    },
    saveItemWidth: (state, action: PayloadAction<{index: number, width: number}>) => {
      const { index, width } = action.payload
      const item = state[index]
      item.width = width
    },
    saveItemHeight: (state, action: PayloadAction<{index: number, height: number}>) => {
      const { index, height } = action.payload
      const item = state[index]
      item.height = height
    },
    saveEditableText: (state, action: PayloadAction<{index: number, height: number, html: string}>) => {
      const { index, height, html } = action.payload
      const item = state[index]
      if (item.type !== 'text editable') return
      const text = item.text
      text.height = height
      text.html = html
    },
    saveBoqHeaderTitle: (state, action: PayloadAction<{index: number, height: number, html: string}>) => {
      const { index, height, html } = action.payload
      const boqItem = state[index] as ItemBoqType
      const title = boqItem.boq.header.title
      title.height = height
      title.html = html
    },
    saveBoqHeaderSubtotalText: (state, action: PayloadAction<{index: number, height: number, html: string}>) => {
      const { index, height, html } = action.payload
      const boqItem = state[index] as ItemBoqType
      const text = boqItem.boq.header.subtotal.text
      text.height = height
      text.html = html
    },
    saveBoqHeaderSubtotalPrice: (state, action: PayloadAction<{index: number, height: number, html: string, value: number}>) => {
      const { index, height, html, value } = action.payload
      const boqItem = state[index] as ItemBoqType
      const price = boqItem.boq.header.subtotal.price
      price.height = height
      price.html = html
      price.value = value
    },
    saveBoqHeaderSubtotalCurrency: (state, action: PayloadAction<{index: number, height: number, html: string}>) => {
      const { index, height, html } = action.payload
      const boqItem = state[index] as ItemBoqType
      const currency = boqItem.boq.header.subtotal.currency
      currency.height = height
      currency.html = html
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(updatePasteTextPos, (state, action: PayloadAction<CopyPlaceType>) => {
        // respond to updatePastePos() action of copySlice, takes current state slice, but action.payload comes from copySlice
        const { pastePos, itemId } = action.payload
        const itemsWithoutPasteText = state.filter(item => item.type !== 'paste')
        if (pastePos === 'middle') return itemsWithoutPasteText
        const insertAtIndex = itemsWithoutPasteText.findIndex(item => item.id === itemId) + (pastePos === 'bottom' ? 1 : 0)
        const pasteTextEl: ItemPasteType = { id: 'paste id', type: 'paste', height: 0, width: 0, msg: '' }
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
  saveItemHeight,
  saveEditableText,
  saveBoqHeaderTitle,
  saveBoqHeaderSubtotalText,
  saveBoqHeaderSubtotalPrice,
  saveBoqHeaderSubtotalCurrency
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
