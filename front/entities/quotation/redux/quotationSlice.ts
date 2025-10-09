import { createSlice } from '@reduxjs/toolkit'
import type { Quotation } from '../type'
import { deleteBlockReducer } from './reducer/deleteBlockReducer'
import { deleteBoqRowReducer } from './reducer/deleteBoqRowReducer'
import { disableFroalaReducer } from './reducer/disableFroalaReducer'
import { enableFroalaReducer } from './reducer/enableFroalaReducer'
import { hideBoqItemPinsReducer } from './reducer/hideBoqItemPinsReducer'
import { hideBoqPriceCellPinsReducer } from './reducer/hideBoqPriceCellPinsReducer'
import { hideBoqRowCellPinReducer } from './reducer/hideBoqRowCellPinReducer'
import { insertPasteBlockReducer } from './reducer/insertPasteBlockReducer'
import { insertPasteBoqRowReducer } from './reducer/insertPasteBoqRowReducer'
import { loadBlockAtPosThousandReducer } from './reducer/loadBlockAtPosThousandReducer'
import { loadQuotationReducer } from './reducer/loadItemsReducer'
import { pasteItemReducer } from './reducer/pasteItemReducer'
import { pinItemPriceReducer } from './reducer/pinItemPriceReducer'
import { pinPriceReducer } from './reducer/pinPriceReducer'
import { pinQtyReducer } from './reducer/pinQtyReducer'
import { removeBlockFromPosThousandReducer } from './reducer/removeBlockFromPosThousandReducer'
import { removePasteItemReducer } from './reducer/removePasteItemReducer'
import { reOrderBoqRowsReducer } from './reducer/reOrderBoqRowsReducer'
import { reOrderBlocksReducer } from './reducer/reOrderItemsReducer'
import { showBoqPriceCellPinsReducer } from './reducer/showBoqPriceCellPinsReducer'
import { showBoqRowCellPinReducer } from './reducer/showBoqRowCellPinReducer'
import { updateBlockHeightReducer } from './reducer/updateBlockHeightReducer'
import { updateBlockTextReducer } from './reducer/updateBlockTextReducer'
import { updateBlockWidthReducer } from './reducer/updateBlockWidthReducer'
import { updateBoqCellReducer } from './reducer/updateBoqCellReducer'
import { updateBoqColumnNameTextReducer } from './reducer/updateBoqColumnNameTextReducer'
import { updateBoqHeaderTextReducer } from './reducer/updateBoqHeaderTextReducer'
import { updateBoqRowHeightAndWidthReducer } from './reducer/updateBoqRowHeightAndWidthReducer'
import { updateColWidthReducer } from './reducer/updateColWidthReducer'
import { updateItemInfoReducer } from './reducer/updateItemInfoReducer'
import { updateItemPreviewReducer } from './reducer/updateItemPreviewReducer'
import { updatePriceReducer } from './reducer/updatePriceReducer'
import { updatePriceTitleReducer } from './reducer/updatePriceTitleReducer'
import { updateQuotationInfoReducer } from './reducer/updateQuotationInfoReducer'
import { updateRowBlockCellReducer } from './reducer/updateRowBlockCellReducer'
import { updateSubTotalPriceReducer } from './reducer/updateSubTotalPriceReducer'

const initialState: Quotation = {
  id: '',
  type: 'quotation',
  email: 'john@mail.com',
  permissionLevel: undefined,
  access: {
    level: 'nobody',
    userList: [],
  },
  blocks: [],
}

export const quotationSlice = createSlice({
  name: 'quotation',
  initialState,
  reducers: {
    loadQuotationReducer,
    loadBlockAtPosThousandReducer,
    removeBlockFromPosThousandReducer,
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
    updateQuotationInfoReducer,
    updateItemInfoReducer,
    updateItemPreviewReducer,
  },
})

export const quotationReducer = quotationSlice.reducer
