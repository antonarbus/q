import { PayloadAction, createSelector, createSlice, current } from '@reduxjs/toolkit'
import { hideCopyContainer, pasteItem, updatePasteTextPos } from 'client/features/copy/copySlice'
import { getItemsFromLocalStorage } from 'client/modules/localStorage'
import { RootState } from 'client/store'
import { nanoid } from 'nanoid'
import { CopyPlaceType } from '../copy/types'
import { defaultItems } from './defaultItems'
import { PasteItem, Items, BoqColumns, BoqRow } from './types'
import { cleanItem } from 'utils/itemsUtils'
// import isEqual from 'lodash.isequal'

type PayloadFroalaUpdate = PayloadAction<{
  index: number, html?: string, height?: number, rowIndex?: number
}>

const initialState: Items = getItemsFromLocalStorage()

const itemsSlice = createSlice({
  name: 'items',
  initialState,
  reducers: {
    saveItemsOrder: (state, action) => action.payload.sortedItems,
    deleteItem: (state, action) => state.filter(item => item?.id !== action.payload.id),
    resetItemsToDefault: () => defaultItems,
    tellItemSavedLocally: (state, action: PayloadAction<{index: number}>) => {
      const { index } = action.payload
      const item = state[index]
      if (!item) return
      item.msg = 'saved locally'
    },
    removeItemMsg: (state, action: PayloadAction<{index: number}>) => {
      const { index } = action.payload
      const item = state[index]
      if (!item) return
      item.msg = ''
    },
    saveItemWidth: (state, action: PayloadAction<{index: number, width: number}>) => {
      const { index, width } = action.payload
      const item = state[index]
      if (!item) return
      item.width = width
    },
    saveItemHeight: (state, action: PayloadAction<{index: number, height: number}>) => {
      const { index, height } = action.payload
      const item = state[index]
      if (!item) return
      item.height = height
    },
    saveText: (state, action: PayloadFroalaUpdate) => {
      const { index, html } = action.payload
      const item = state[index]
      if (!item) return
      if (item.type !== 'text') return
      if (html) item.text.html = html
    },
    saveBoqHeaderTitle: (state, action: PayloadFroalaUpdate) => {
      const { index, html } = action.payload
      const item = state[index]
      if (!item) return
      if (item.type !== 'boq') return
      if (html) item.boq.header.title.html = html
    },
    saveBoqHeaderSubtotalText: (state, action: PayloadFroalaUpdate) => {
      const { index, html } = action.payload
      const item = state[index]
      if (!item) return
      if (item.type !== 'boq') return
      if (html) item.boq.header.subtotal.text.html = html
    },
    saveBoqHeaderSubtotalPrice: (state, action: PayloadFroalaUpdate) => {
      const { index, html } = action.payload
      const item = state[index]
      if (!item) return
      if (item.type !== 'boq') return
      if (html) item.boq.header.subtotal.price.html = html
      // todo: add logic for value
    },
    saveBoqHeaderSubtotalCurrency: (state, action: PayloadFroalaUpdate) => {
      const { index, html } = action.payload
      const item = state[index]
      if (!item) return
      if (item.type !== 'boq') return
      if (html) item.boq.header.subtotal.currency.html = html
    },
    saveBoqColumnNameDescription: (state, action: PayloadFroalaUpdate) => {
      const { index, html } = action.payload
      const item = state[index]
      if (!item) return
      if (item.type !== 'boq') return
      if (html) item.boq.column.description.html = html
    },
    saveBoqColumnNameItem: (state, action: PayloadFroalaUpdate) => {
      const { index, html } = action.payload
      const item = state[index]
      if (!item) return
      if (item.type !== 'boq') return
      if (html) item.boq.column.item.html = html
    },
    saveBoqColumnNameQty: (state, action: PayloadFroalaUpdate) => {
      const { index, html } = action.payload
      const item = state[index]
      if (!item) return
      if (item.type !== 'boq') return
      if (html) item.boq.column.qty.html = html
    },
    saveBoqColumnNamePrice: (state, action: PayloadFroalaUpdate) => {
      const { index, html } = action.payload
      const item = state[index]
      if (!item) return
      if (item.type !== 'boq') return
      if (html) item.boq.column.price.html = html
    },
    saveBoqDescription: (state, action: PayloadFroalaUpdate) => {
      const { index, html, rowIndex } = action.payload
      const item = state[index]
      if (!item) return
      if (item.type !== 'boq') return
      if (rowIndex !== undefined) {
        if (html) item.boq.rows[rowIndex].description.html = html
      }
    },
    saveBoqItem: (state, action: PayloadFroalaUpdate) => {
      const { index, html, rowIndex } = action.payload
      const item = state[index]
      if (!item) return
      if (item.type !== 'boq') return
      if (rowIndex !== undefined) {
        if (html) item.boq.rows[rowIndex].item.html = html
      }
    },
    saveBoqQty: (state, action: PayloadFroalaUpdate) => {
      const { index, html, rowIndex } = action.payload
      const item = state[index]
      if (!item) return
      if (item.type !== 'boq') return
      if (rowIndex !== undefined) {
        if (html) item.boq.rows[rowIndex].qty.html = html
      }
    },
    saveBoqPrice: (state, action: PayloadFroalaUpdate) => {
      const { index, html, rowIndex } = action.payload
      const item = state[index]
      if (!item) return
      if (item.type !== 'boq') return
      if (rowIndex !== undefined) {
        if (html) item.boq.rows[rowIndex].price.html = html
      }
    },
    saveBoqColumnWidth: (state, action: PayloadAction<{index: number, colId: keyof BoqColumns, width: number}>) => {
      const { index, colId, width } = action.payload
      const item = state[index]
      if (!item) return
      if (item.type !== 'boq') return
      item.boq.column[colId].width = width
    },
    updateBoqRowsOrder: (state, action: PayloadAction<{index: number, rowIdsOrdered: string[]}>) => {
      const { index, rowIdsOrdered } = action.payload
      const item = state[index]
      if (!item) return
      if (item.type !== 'boq') return
      const boq = item.boq
      // console.log(current(rows))
      const updatedRows:BoqRow[] = []
      rowIdsOrdered.forEach((id) => {
        const rowWithSameId = boq.rows.find((row) => row.id === id)
        if (!rowWithSameId) return
        updatedRows.push(rowWithSameId)
      })
      boq.rows = updatedRows
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(updatePasteTextPos, (state, action: PayloadAction<CopyPlaceType>) => {
        // respond to updatePastePos() action of copySlice, takes current state slice, but action.payload comes from copySlice
        const { pastePos, itemId } = action.payload
        const itemsWithoutPasteText = state.filter(item => item?.type !== 'paste')
        if (pastePos === 'middle') return itemsWithoutPasteText
        const insertAtIndex = itemsWithoutPasteText.findIndex(item => item?.id === itemId) + (pastePos === 'bottom' ? 1 : 0)
        const pasteTextEl: PasteItem = { id: 'paste id', type: 'paste', height: 0, width: 0, msg: '' }
        itemsWithoutPasteText.splice(insertAtIndex, 0, pasteTextEl)
        return itemsWithoutPasteText
      })
      .addCase(hideCopyContainer, (state) => state.filter(item => item?.type !== 'paste'))
      // .addCase(exitFromCopyMode, (state) => state.filter(item => item.type !== 'paste'))
      .addCase(pasteItem, (state, action) => {
        const { itemId, pastePos, item } = action.payload
        const cleanedItem = cleanItem(item)
        const itemToPaste = { ...cleanedItem, id: nanoid(5) }
        const hoveredItemIndex = state.findIndex(item => item?.id === itemId)

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
        const itemsWithoutPasteText = state.filter(item => item?.type !== 'paste')
        itemsWithoutPasteText.splice(spliceSettings.insertAtIndex, spliceSettings.deleteCount, itemToPaste)
        return itemsWithoutPasteText
      })
  },
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
  saveText,
  saveBoqHeaderTitle,
  saveBoqHeaderSubtotalText,
  saveBoqHeaderSubtotalPrice,
  saveBoqHeaderSubtotalCurrency,
  saveBoqColumnNameDescription,
  saveBoqColumnNameItem,
  saveBoqColumnNameQty,
  saveBoqColumnNamePrice,
  saveBoqDescription,
  saveBoqItem,
  saveBoqQty,
  saveBoqPrice,
  saveBoqColumnWidth,
  updateBoqRowsOrder,
} = itemsSlice.actions
export default itemsSlice.reducer

// selectors
export const selectIsLastItem = (state: RootState) =>
  state.items.filter((item) => item?.type !== 'paste').length === 1

export const selectItemsShape = createSelector(
  [(state: RootState) => state.items],
  (items) => items,
  {
    memoizeOptions: {
      // resultEqualityCheck: isEqual
      resultEqualityCheck: (prevItems:Items, currentItems:Items) => {
        const addedOrDeletedItem = prevItems.length !== currentItems.length
        if (addedOrDeletedItem) return false
        const itemsIdsDoNotMatch = prevItems.some((item, index) =>
          item?.id !== currentItems[index]?.id)
        if (itemsIdsDoNotMatch) return false
        return true
      },
    },
  }
)
