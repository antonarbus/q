import type { Item } from 'client/shared/types'
import { createSlice } from '@reduxjs/toolkit'
import { defaultItems } from '../model/defaultItems'
import { deleteBoqRowReducer } from '../reducers/deleteBoqRowReducer'
import { deleteItemReducer } from '../reducers/deleteItemReducer'
import { getDefaultOrLocalItems } from '../model/getDefaultOrLocalItems'
import { insertPasteBoqRowReducer } from '../reducers/insertPasteBoqRowReducer'
import { insertPasteItemReducer } from '../reducers/insertPasteItemReducer'
import { makeItemBitWiderReducer } from '../reducers/makeItemBitWiderReducer'
import { pasteItemReducer } from '../reducers/pasteItemReducer'
import { removeItemsMsgReducer } from '../reducers/removeItemMsgReducer'
import { removePasteItemReducer } from '../reducers/removePasteItemReducer'
import { reOrderBoqRowsReducer } from '../reducers/reOrderBoqRowsReducer'
import { reOrderItemsReducer } from '../reducers/reOrderItemsReducer'
import { saveBoqHeaderTextReducer } from '../reducers/saveBoqHeaderTextReducer'
import { saveBoqRowHeightAndWidthReducer } from '../reducers/saveBoqRowHeightAndWidthReducer'
import { saveColWidthReducer } from '../reducers/saveColWidthReducer'
import { saveItemHeightReducer } from '../reducers/saveItemHeightReducer'
import { saveItemHeightsReducer } from '../reducers/saveItemHeightsReducer'
import { saveItemTextReducer } from '../reducers/saveItemTextReducer'
import { saveItemWidthReducer } from '../reducers/saveItemWidthReducer'
import { tellItemSavedLocallyReducer } from '../reducers/tellItemSavedLocallyReducer'
import { saveBoqColumnNameTextReducer } from '../reducers/saveBoqColumnNameTextReducer'
import { saveBoqCellReducer } from '../reducers/saveBoqCellReducer'
import { updateTotalPriceReducer } from '../reducers/updateTotalPriceReducer'

export type ItemsState = Item[]

const initialState = getDefaultOrLocalItems()

export const itemsSlice = createSlice({
  name: 'items',
  initialState,
  reducers: {
    deleteBoqRow: deleteBoqRowReducer,
    deleteItem: deleteItemReducer,
    insertPasteBoqRow: insertPasteBoqRowReducer,
    insertPasteItem: insertPasteItemReducer,
    makeItemBitWider: makeItemBitWiderReducer,
    pasteItem: pasteItemReducer, // ? what is the difference between insertPasteItem
    removeItemsMsg: removeItemsMsgReducer,
    removePasteItem: removePasteItemReducer,
    reOrderBoqRows: reOrderBoqRowsReducer,
    reOrderItems: reOrderItemsReducer,
    resetItemsToDefault: () => defaultItems,
    saveBoqHeaderText: saveBoqHeaderTextReducer,
    saveBoqColumnNameText: saveBoqColumnNameTextReducer,
    saveBoqCell: saveBoqCellReducer,
    saveBoqRowHeightAndWidth: saveBoqRowHeightAndWidthReducer,
    saveColWidth: saveColWidthReducer,
    saveItemHeight: saveItemHeightReducer,
    saveItemHeights: saveItemHeightsReducer, // todo: not used anywhere
    saveItemText: saveItemTextReducer,
    saveItemWidth: saveItemWidthReducer,
    tellItemSavedLocally: tellItemSavedLocallyReducer,
    updateTotalPrice: updateTotalPriceReducer,
  },
})
