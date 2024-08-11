import { createSlice } from '@reduxjs/toolkit'
import type { Quotation } from '../types'
import { deleteBoqRowReducer } from './reducers/deleteBoqRowReducer'
import { deleteBlockReducer } from './reducers/deleteBlockReducer'
import { disableFroalaReducer } from './reducers/disableFroalaReducer'
import { enableFroalaReducer } from './reducers/enableFroalaReducer'
import { fixImagesHeightReducer } from './reducers/fixImagesHeightReducer'
import { hideBoqItemPinsReducer } from './reducers/hideBoqItemPinsReducer'
import { hideBoqPriceCellPinsReducer } from './reducers/hideBoqPriceCellPinsReducer'
import { hideBoqRowCellPinReducer } from './reducers/hideBoqRowCellPinReducer'
import { insertPasteBoqRowReducer } from './reducers/insertPasteBoqRowReducer'
import { insertPasteBlockReducer } from './reducers/insertPasteBlockReducer'
import { loadQuotationReducer } from './reducers/loadItemsReducer'
import { loadBookmarkAtPosThousandReducer } from './reducers/loadBookmarkAtPosThousandReducer'
import { removeBookmarkReducer } from './reducers/removeBookmarkReducer'
import { pasteItemReducer } from './reducers/pasteItemReducer'
import { pinItemPriceReducer } from './reducers/pinItemPriceReducer'
import { pinPriceReducer } from './reducers/pinPriceReducer'
import { pinQtyReducer } from './reducers/pinQtyReducer'
import { removePasteItemReducer } from './reducers/removePasteItemReducer'
import { reOrderBoqRowsReducer } from './reducers/reOrderBoqRowsReducer'
import { reOrderBlocksReducer } from './reducers/reOrderItemsReducer'
import { showBoqPriceCellPinsReducer } from './reducers/showBoqPriceCellPinsReducer'
import { showBoqRowCellPinReducer } from './reducers/showBoqRowCellPinReducer'
import { unfixImagesHeightReducer } from './reducers/unfixImagesHeightReducer'
import { updateBoqCellReducer } from './reducers/updateBoqCellReducer'
import { updateBoqColumnNameTextReducer } from './reducers/updateBoqColumnNameTextReducer'
import { updateBoqHeaderTextReducer } from './reducers/updateBoqHeaderTextReducer'
import { updateBoqRowHeightAndWidthReducer } from './reducers/updateBoqRowHeightAndWidthReducer'
import { updateColWidthReducer } from './reducers/updateColWidthReducer'
import { updateBlockHeightReducer } from './reducers/updateBlockHeightReducer'
import { updateItemInfoReducer } from './reducers/updateItemInfoReducer'
import { updateItemPreviewReducer } from './reducers/updateItemPreviewReducer'
import { updateBlockTextReducer } from './reducers/updateBlockTextReducer'
import { updateBlockWidthReducer } from './reducers/updateBlockWidthReducer'
import { updatePriceReducer } from './reducers/updatePriceReducer'
import { updatePriceTitleReducer } from './reducers/updatePriceTitleReducer'
import { updateQuotationInfoReducer } from './reducers/updateQuotationInfoReducer'
import { updateSubTotalPriceReducer } from './reducers/updateSubTotalPriceReducer'
import { updateRowBlockCellReducer } from './reducers/updateRowBlockCellReducer'

const initialState: Quotation = {
  id: '',
  type: 'quotation',
  email: 'john@mail.com',
  blocks: [],
}

export const quotationSlice = createSlice({
  name: 'quotation',
  initialState,
  reducers: {
    loadQuotationReducer,
    loadBookmarkAtPosThousandReducer,
    removeBookmarkReducer,
    resetQuotationReducer: () => initialState,
    deleteBoqRowReducer,
    deleteBlockReducer,
    disableFroalaReducer,
    enableFroalaReducer,
    hideBoqItemPinsReducer,
    hideBoqRowCellPinReducer,
    insertPasteBoqRowReducer,
    insertPasteBlockReducer,
    pasteItemReducer,
    pinItemPriceReducer,
    pinQtyReducer,
    pinPriceReducer,
    removePasteItemReducer,
    reOrderBoqRowsReducer,
    reOrderBlocksReducer,
    showBoqRowCellPinReducer,
    showBoqPriceCellPinsReducer,
    hideBoqPriceCellPinsReducer,
    updateBoqCellReducer,
    updateRowBlockCellReducer,
    updateBoqColumnNameTextReducer,
    updateBoqHeaderTextReducer,
    updateBoqRowHeightAndWidthReducer,
    updateColWidthReducer,
    updateBlockHeightReducer,
    updateBlockTextReducer,
    updateBlockWidthReducer,
    updateSubTotalPriceReducer,
    updatePriceTitleReducer,
    updatePriceReducer,
    fixImagesHeightReducer,
    unfixImagesHeightReducer,
    updateQuotationInfoReducer,
    updateItemInfoReducer,
    updateItemPreviewReducer,
  },
})

export const quotationReducer = quotationSlice.reducer
