import type { Item } from 'client/shared/types'
import { createSlice } from '@reduxjs/toolkit'
import { defaultItems } from '../model/defaultItems'
import { deleteBoqRowReducer } from './reducers/deleteBoqRowReducer'
import { deleteItemReducer } from './reducers/deleteItemReducer'
import { disableFroalaReducer } from './reducers/disableFroalaReducer'
import { enableFroalaReducer } from './reducers/enableFroalaReducer'
import { getDefaultOrLocalItems } from '../utils/getDefaultOrLocalItems'
import { insertPasteBoqRowReducer } from './reducers/insertPasteBoqRowReducer'
import { insertPasteItemReducer } from './reducers/insertPasteItemReducer'
import { pasteItemReducer } from './reducers/pasteItemReducer'
import { removeItemsMsgReducer } from './reducers/removeItemMsgReducer'
import { removePasteItemReducer } from './reducers/removePasteItemReducer'
import { reOrderBoqRowsReducer } from './reducers/reOrderBoqRowsReducer'
import { reOrderItemsReducer } from './reducers/reOrderItemsReducer'
import { tellItemSavedLocallyReducer } from './reducers/tellItemSavedLocallyReducer'
import { updateBoqCellReducer } from './reducers/updateBoqCellReducer'
import { updateBoqColumnNameTextReducer } from './reducers/updateBoqColumnNameTextReducer'
import { updateBoqHeaderTextReducer } from './reducers/updateBoqHeaderTextReducer'
import { updateBoqRowHeightAndWidthReducer } from './reducers/updateBoqRowHeightAndWidthReducer'
import { updateColWidthReducer } from './reducers/updateColWidthReducer'
import { updateItemHeightReducer } from './reducers/updateItemHeightReducer'
import { updateItemTextReducer } from './reducers/updateItemTextReducer'
import { updateItemWidthReducer } from './reducers/updateItemWidthReducer'
import { updateSubTotalPriceReducer } from './reducers/updateTotalPriceReducer'
import { showBoqRowCellPinReducer } from './reducers/showShowBoqRowCellPinReducer'
import { hideBoqRowCellPinReducer } from './reducers/hideBoqRowCellPinReducer'
import { hideBoqItemPinsReducer } from './reducers/hideBoqItemPinsReducer'
import { pinQtyReducer } from './reducers/pinQtyReducer'
import { pinItemPriceReducer } from './reducers/pinItemPriceReducer'

export type ItemsState = Item[]

const initialState = getDefaultOrLocalItems()

export const itemsSlice = createSlice({
  name: 'items',
  initialState,
  reducers: {
    deleteBoqRowReducer,
    deleteItemReducer,
    disableFroalaReducer,
    enableFroalaReducer,
    insertPasteBoqRowReducer,
    insertPasteItemReducer,
    pasteItemReducer, // ? what is the difference between insertPasteItem
    removeItemsMsgReducer,
    removePasteItemReducer,
    reOrderBoqRowsReducer,
    reOrderItemsReducer,
    resetItemsToDefaultReducer: () => defaultItems,
    tellItemSavedLocallyReducer,
    updateBoqCellReducer,
    updateBoqColumnNameTextReducer,
    updateBoqHeaderTextReducer,
    updateBoqRowHeightAndWidthReducer,
    updateColWidthReducer,
    updateItemHeightReducer,
    updateItemTextReducer,
    updateItemWidthReducer,
    updateSubTotalPriceReducer,
    showBoqRowCellPinReducer,
    hideBoqRowCellPinReducer,
    hideBoqItemPinsReducer,
    pinQtyReducer,
    pinItemPriceReducer,
  },
})
