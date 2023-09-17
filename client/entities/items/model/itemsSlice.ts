import type { Item } from 'client/shared/types'
import { createSlice, current } from '@reduxjs/toolkit'
import { defaultItems } from './defaultItems'
import { reOrderItemsReducer } from './reducers/reOrderItemsReducer'
import { deleteItemReducer } from './reducers/deleteItemReducer'
import { pasteItemReducer } from './reducers/pasteItemReducer'
import { insertPasteItemReducer } from './reducers/insertPasteItemReducer'
import { removeItemMsgReducer } from './reducers/removeItemMsgReducer'
import { removePasteItemReducer } from './reducers/removePasteItemReducer'
import { saveItemHeightReducer } from './reducers/saveItemHeightReducer'
import { saveItemHeightsReducer } from './reducers/saveItemHeightsReducer'
import { saveItemTextReducer } from './reducers/saveItemTextReducer'
import { saveItemWidthReducer } from './reducers/saveItemWidthReducer'
import { tellItemSavedLocallyReducer } from './reducers/tellItemSavedLocallyReducer'
import { getDefaultOrLocalItems } from './getDefaultOrLocalItems'
import { saveBoqHeaderTextReducer } from './reducers/saveBoqHeaderTextReducer'
import { saveColWidthReducer } from './reducers/saveColWidthReducer'
import { makeItemBitWiderReducer } from './reducers/makeItemBitWiderReducer'
import { reOrderBoqRowsReducer } from './reducers/reOrderBoqRowsReducer'
import { saveBoqRowHeightAndWidthReducer } from './reducers/saveBoqRowHeightAndWidthReducer'
import { insertPasteBoqRowReducer } from './reducers/insertPasteBoqRowReducer'

export type ItemsState = Item[]

const initialState = getDefaultOrLocalItems()

export const itemsSlice = createSlice({
  name: 'items',
  initialState,
  reducers: {
    reOrderItems: reOrderItemsReducer,
    reOrderBoqRows: reOrderBoqRowsReducer,
    deleteItem: deleteItemReducer,
    pasteItem: pasteItemReducer,
    resetItemsToDefault: () => defaultItems,
    tellItemSavedLocally: tellItemSavedLocallyReducer,
    removeItemMsg: removeItemMsgReducer,
    saveItemWidth: saveItemWidthReducer,
    makeItemBitWider: makeItemBitWiderReducer,
    saveItemHeight: saveItemHeightReducer,
    saveBoqRowHeightAndWidth: saveBoqRowHeightAndWidthReducer,
    saveItemHeights: saveItemHeightsReducer, // todo: not used anywhere
    saveItemText: saveItemTextReducer,
    removePasteItem: removePasteItemReducer,
    insertPasteItem: insertPasteItemReducer,
    insertPasteBoqRow: insertPasteBoqRowReducer,
    saveBoqHeaderText: saveBoqHeaderTextReducer,
    saveColWidth: saveColWidthReducer,
  },
})
