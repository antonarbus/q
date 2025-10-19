import { createSlice, type Reducer } from '@reduxjs/toolkit'
import type { Quotation } from '../type'
import { deleteBlockReducer } from './reducer/deleteBlockReducer'
import { deleteRowReducer } from './reducer/deleteRowReducer'
import { disableFroalaReducer } from './reducer/disableFroalaReducer'
import { enableFroalaReducer } from './reducer/enableFroalaReducer'
import { hideBoqItemPinsReducer } from './reducer/hideBoqItemPinsReducer'
import { hideBoqPriceCellPinsReducer } from './reducer/hideBoqPriceCellPinsReducer'
import { hideCellPinReducer } from './reducer/hideCellPinReducer'
import { insertPasteBlockReducer } from './reducer/insertPasteBlockReducer'
import { insertPasteRowReducer } from './reducer/insertPasteRowReducer'
import { loadBlockAtPosThousandReducer } from './reducer/loadBlockAtPosThousandReducer'
import { loadQuotationReducer } from './reducer/loadItemsReducer'
import { pasteItemReducer } from './reducer/pasteItemReducer'
import { pinItemPriceReducer } from './reducer/pinItemPriceReducer'
import { pinPriceReducer } from './reducer/pinPriceReducer'
import { pinQtyReducer } from './reducer/pinQtyReducer'
import { removeBlockFromPosThousandReducer } from './reducer/removeBlockFromPosThousandReducer'
import { removePasteItemReducer } from './reducer/removePasteItemReducer'
import { reOrderBlocksReducer } from './reducer/reOrderItemsReducer'
import { reOrderRowsReducer } from './reducer/reOrderRowsReducer'
import { showBoqPriceCellPinsReducer } from './reducer/showBoqPriceCellPinsReducer'
import { showCellPinReducer } from './reducer/showCellPinReducer'
import { updateBlockHeightReducer } from './reducer/updateBlockHeightReducer'
import { updateBlockTextReducer } from './reducer/updateBlockTextReducer'
import { updateBlockWidthReducer } from './reducer/updateBlockWidthReducer'
import { updateBoqColumnNameTextReducer } from './reducer/updateBoqColumnNameTextReducer'
import { updateBoqHeaderTextReducer } from './reducer/updateBoqHeaderTextReducer'
import { updateCellReducer } from './reducer/updateCellReducer'
import { updateColWidthReducer } from './reducer/updateColWidthReducer'
import { updateItemInfoReducer } from './reducer/updateItemInfoReducer'
import { updateItemPreviewReducer } from './reducer/updateItemPreviewReducer'
import { updatePriceReducer } from './reducer/updatePriceReducer'
import { updatePriceTitleReducer } from './reducer/updatePriceTitleReducer'
import { updateQuotationInfoReducer } from './reducer/updateQuotationInfoReducer'
import { updateRowBlockCellReducer } from './reducer/updateRowBlockCellReducer'
import { updateRowHeightAndWidthReducer } from './reducer/updateRowHeightAndWidthReducer'
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
    deleteRowReducer,
    deleteBlockReducer,
    disableFroalaReducer,
    enableFroalaReducer,
    hideBoqItemPinsReducer,
    hideCellPinReducer,
    insertPasteRowReducer,
    insertPasteBlockReducer,
    pasteItemReducer,
    pinItemPriceReducer,
    pinQtyReducer,
    pinPriceReducer,
    removePasteItemReducer,
    reOrderRowsReducer,
    reOrderBlocksReducer,
    showCellPinReducer,
    showBoqPriceCellPinsReducer,
    hideBoqPriceCellPinsReducer,
    updateCellReducer,
    updateRowBlockCellReducer,
    updateBoqColumnNameTextReducer,
    updateBoqHeaderTextReducer,
    updateRowHeightAndWidthReducer,
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

export const quotationReducer: Reducer<Quotation> = quotationSlice.reducer
