import { createSlice } from '@reduxjs/toolkit'
import { getDefaultOrLocalItems } from '../utils/getDefaultOrLocalItems'
import { deleteBoqRowReducer } from './reducers/deleteBoqRowReducer'
import { deleteItemReducer } from './reducers/deleteItemReducer'
import { disableFroalaReducer } from './reducers/disableFroalaReducer'
import { enableFroalaReducer } from './reducers/enableFroalaReducer'
import { fixImagesHeightReducer } from './reducers/fixImagesHeightReducer'
import { hideBoqItemPinsReducer } from './reducers/hideBoqItemPinsReducer'
import { hideBoqPriceCellPinsReducer } from './reducers/hideBoqPriceCellPinsReducer'
import { hideBoqRowCellPinReducer } from './reducers/hideBoqRowCellPinReducer'
import { insertPasteBoqRowReducer } from './reducers/insertPasteBoqRowReducer'
import { insertPasteItemReducer } from './reducers/insertPasteItemReducer'
import { loadItemsReducer } from './reducers/loadItemsReducer'
import { pasteItemReducer } from './reducers/pasteItemReducer'
import { pinItemPriceReducer } from './reducers/pinItemPriceReducer'
import { pinPriceReducer } from './reducers/pinPriceReducer'
import { pinQtyReducer } from './reducers/pinQtyReducer'
import { removeItemsMsgReducer } from './reducers/removeItemMsgReducer'
import { removeItemsReducer } from './reducers/removeItemsReducer'
import { removePasteItemReducer } from './reducers/removePasteItemReducer'
import { reOrderBoqRowsReducer } from './reducers/reOrderBoqRowsReducer'
import { reOrderItemsReducer } from './reducers/reOrderItemsReducer'
import { resetItemsToDefaultReducer } from './reducers/resetItemsToDefaultReducer'
import { showBoqPriceCellPinsReducer } from './reducers/showBoqPriceCellPinsReducer'
import { showBoqRowCellPinReducer } from './reducers/showBoqRowCellPinReducer'
import { showItemMsgReducer } from './reducers/showItemMsgReducer'
import { unfixImagesHeightReducer } from './reducers/unfixImagesHeightReducer'
import { updateBoqCellReducer } from './reducers/updateBoqCellReducer'
import { updateBoqColumnNameTextReducer } from './reducers/updateBoqColumnNameTextReducer'
import { updateBoqHeaderTextReducer } from './reducers/updateBoqHeaderTextReducer'
import { updateBoqRowHeightAndWidthReducer } from './reducers/updateBoqRowHeightAndWidthReducer'
import { updateColWidthReducer } from './reducers/updateColWidthReducer'
import { updateItemHeightReducer } from './reducers/updateItemHeightReducer'
import { updateItemTextReducer } from './reducers/updateItemTextReducer'
import { updateItemWidthReducer } from './reducers/updateItemWidthReducer'
import { updatePriceReducer } from './reducers/updatePriceReducer'
import { updatePriceTitleReducer } from './reducers/updatePriceTitleReducer'
import { updateSubTotalPriceReducer } from './reducers/updateSubTotalPriceReducer'

const initialState = getDefaultOrLocalItems()

export const itemsSlice = createSlice({
  name: 'items',
  initialState,
  reducers: {
    loadItemsReducer,
    removeItemsReducer,
    deleteBoqRowReducer,
    deleteItemReducer,
    disableFroalaReducer,
    enableFroalaReducer,
    hideBoqItemPinsReducer,
    hideBoqRowCellPinReducer,
    insertPasteBoqRowReducer,
    insertPasteItemReducer,
    pasteItemReducer,
    pinItemPriceReducer,
    pinQtyReducer,
    pinPriceReducer,
    removeItemsMsgReducer,
    removePasteItemReducer,
    reOrderBoqRowsReducer,
    reOrderItemsReducer,
    resetItemsToDefaultReducer,
    showBoqRowCellPinReducer,
    showBoqPriceCellPinsReducer,
    hideBoqPriceCellPinsReducer,
    showItemMsgReducer,
    updateBoqCellReducer,
    updateBoqColumnNameTextReducer,
    updateBoqHeaderTextReducer,
    updateBoqRowHeightAndWidthReducer,
    updateColWidthReducer,
    updateItemHeightReducer,
    updateItemTextReducer,
    updateItemWidthReducer,
    updateSubTotalPriceReducer,
    updatePriceTitleReducer,
    updatePriceReducer,
    fixImagesHeightReducer,
    unfixImagesHeightReducer,
  },
})

export const itemsReducer = itemsSlice.reducer
