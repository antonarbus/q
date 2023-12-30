import type { Item } from 'client/shared/types'
import { createSlice } from '@reduxjs/toolkit'
import { defaultItems } from '../model/defaultItems'
import { deleteBoqRowReducer } from '../reducers/deleteBoqRowReducer'
import { deleteItemReducer } from '../reducers/deleteItemReducer'
import { disableFroalaReducer } from '../reducers/disableFroalaReducer'
import { enableFroalaReducer } from '../reducers/enableFroalaReducer'
import { getDefaultOrLocalItems } from '../utils/getDefaultOrLocalItems'
import { insertPasteBoqRowReducer } from '../reducers/insertPasteBoqRowReducer'
import { insertPasteItemReducer } from '../reducers/insertPasteItemReducer'
import { pasteItemReducer } from '../reducers/pasteItemReducer'
import { removeItemsMsgReducer } from '../reducers/removeItemMsgReducer'
import { removePasteItemReducer } from '../reducers/removePasteItemReducer'
import { reOrderBoqRowsReducer } from '../reducers/reOrderBoqRowsReducer'
import { reOrderItemsReducer } from '../reducers/reOrderItemsReducer'
import { tellItemSavedLocallyReducer } from '../reducers/tellItemSavedLocallyReducer'
import { updateBoqCellReducer } from '../reducers/updateBoqCellReducer'
import { updateBoqColumnNameTextReducer } from '../reducers/updateBoqColumnNameTextReducer'
import { updateBoqHeaderTextReducer } from '../reducers/updateBoqHeaderTextReducer'
import { updateBoqRowHeightAndWidthReducer } from '../reducers/updateBoqRowHeightAndWidthReducer'
import { updateColWidthReducer } from '../reducers/updateColWidthReducer'
import { updateItemHeightReducer } from '../reducers/updateItemHeightReducer'
import { updateItemHeightsReducer } from '../reducers/updateItemHeightsReducer'
import { updateItemTextReducer } from '../reducers/updateItemTextReducer'
import { updateItemWidthReducer } from '../reducers/updateItemWidthReducer'
import { updateTotalPriceReducer } from '../reducers/updateTotalPriceReducer'

export type ItemsState = Item[]

const initialState = getDefaultOrLocalItems()

export const itemsSlice = createSlice({
  name: 'items',
  initialState,
  reducers: {
    deleteBoqRow: deleteBoqRowReducer,
    deleteItem: deleteItemReducer,
    disableFroala: disableFroalaReducer,
    enableFroala: enableFroalaReducer,
    insertPasteBoqRow: insertPasteBoqRowReducer,
    insertPasteItem: insertPasteItemReducer,
    pasteItem: pasteItemReducer, // ? what is the difference between insertPasteItem
    removeItemsMsg: removeItemsMsgReducer,
    removePasteItem: removePasteItemReducer,
    reOrderBoqRows: reOrderBoqRowsReducer,
    reOrderItems: reOrderItemsReducer,
    resetItemsToDefault: () => defaultItems,
    tellItemSavedLocally: tellItemSavedLocallyReducer,
    updateBoqCell: updateBoqCellReducer,
    updateBoqColumnNameText: updateBoqColumnNameTextReducer,
    updateBoqHeaderText: updateBoqHeaderTextReducer,
    updateBoqRowHeightAndWidth: updateBoqRowHeightAndWidthReducer,
    updateColWidth: updateColWidthReducer,
    updateItemHeight: updateItemHeightReducer,
    updateItemHeights: updateItemHeightsReducer, // todo: not used anywhere
    updateItemText: updateItemTextReducer,
    updateItemWidth: updateItemWidthReducer,
    updateTotalPrice: updateTotalPriceReducer,
  },
})
