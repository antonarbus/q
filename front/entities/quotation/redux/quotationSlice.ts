import { createSlice } from '@reduxjs/toolkit'
import { itemKey } from '../consts/itemKey'
import { type Quotation } from '../types'
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
import { loadQuotationReducer } from './reducers/loadItemsReducer'
import { pasteItemReducer } from './reducers/pasteItemReducer'
import { pinItemPriceReducer } from './reducers/pinItemPriceReducer'
import { pinPriceReducer } from './reducers/pinPriceReducer'
import { pinQtyReducer } from './reducers/pinQtyReducer'
import { removePasteItemReducer } from './reducers/removePasteItemReducer'
import { reOrderBoqRowsReducer } from './reducers/reOrderBoqRowsReducer'
import { reOrderItemsReducer } from './reducers/reOrderItemsReducer'
import { showBoqPriceCellPinsReducer } from './reducers/showBoqPriceCellPinsReducer'
import { showBoqRowCellPinReducer } from './reducers/showBoqRowCellPinReducer'
import { unfixImagesHeightReducer } from './reducers/unfixImagesHeightReducer'
import { updateBoqCellReducer } from './reducers/updateBoqCellReducer'
import { updateBoqColumnNameTextReducer } from './reducers/updateBoqColumnNameTextReducer'
import { updateBoqHeaderTextReducer } from './reducers/updateBoqHeaderTextReducer'
import { updateBoqRowHeightAndWidthReducer } from './reducers/updateBoqRowHeightAndWidthReducer'
import { updateColWidthReducer } from './reducers/updateColWidthReducer'
import { updateItemHeightReducer } from './reducers/updateItemHeightReducer'
import { updateItemInfoByIdReducer } from './reducers/updateItemInfoByIdReducer'
import { updateItemPreviewByIdReducer } from './reducers/updateItemPreviewByIdReducer'
import { updateItemTextReducer } from './reducers/updateItemTextReducer'
import { updateItemWidthReducer } from './reducers/updateItemWidthReducer'
import { updatePriceReducer } from './reducers/updatePriceReducer'
import { updatePriceTitleReducer } from './reducers/updatePriceTitleReducer'
import { updateQuotationInfoReducer } from './reducers/updateQuotationInfoReducer'
import { updateSubTotalPriceReducer } from './reducers/updateSubTotalPriceReducer'

const initialState: Quotation = {
  type: itemKey.quotation,
  id: '',
  blocks: [],
}

export const quotationSlice = createSlice({
  name: 'quotation',
  initialState,
  reducers: {
    loadQuotationReducer,
    resetQuotationReducer: () => initialState,
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
    removePasteItemReducer,
    reOrderBoqRowsReducer,
    reOrderItemsReducer,
    showBoqRowCellPinReducer,
    showBoqPriceCellPinsReducer,
    hideBoqPriceCellPinsReducer,
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
    updateQuotationInfoReducer,
    updateItemInfoByIdReducer,
    updateItemPreviewByIdReducer,
  },
})

export const quotationReducer = quotationSlice.reducer
