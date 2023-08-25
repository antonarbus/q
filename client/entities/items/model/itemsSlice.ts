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

export type ItemsState = Item[]

const initialState = getDefaultOrLocalItems()

export const itemsSlice = createSlice({
  name: 'items',
  initialState,
  reducers: {
    reOrderItems: reOrderItemsReducer,
    deleteItem: deleteItemReducer,
    pasteItem: pasteItemReducer,
    resetItemsToDefault: () => defaultItems,
    tellItemSavedLocally: tellItemSavedLocallyReducer,
    removeItemMsg: removeItemMsgReducer,
    saveItemWidth: saveItemWidthReducer,
    saveItemHeight: saveItemHeightReducer,
    saveItemHeights: saveItemHeightsReducer, // todo: not used anywhere
    saveItemText: saveItemTextReducer,
    removePasteItem: removePasteItemReducer,
    insertPasteItem: insertPasteItemReducer,
    saveBoqHeaderText: saveBoqHeaderTextReducer,
    saveColWidth: saveColWidthReducer,
  },
})

