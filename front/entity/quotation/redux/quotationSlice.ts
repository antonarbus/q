import { createSlice, type Reducer } from '@reduxjs/toolkit'
import type { Quotation } from '@back/entity/quotation/schema'

// Delete operations
import { deleteBlockReducer } from './reducer/delete/deleteBlockReducer'
import { deleteRowReducer } from './reducer/delete/deleteRowReducer'

// Insert/paste operations
import { pasteItemReducer } from './reducer/insert/pasteItemReducer'
import { reOrderBlocksReducer } from './reducer/insert/reOrderItemsReducer'
import { reOrderRowsReducer } from './reducer/insert/reOrderRowsReducer'

// Layout operations
import { updateBlockHeightReducer } from './reducer/layout/updateBlockHeightReducer'
import { updateBlockWidthReducer } from './reducer/layout/updateBlockWidthReducer'
import { updateColWidthReducer } from './reducer/layout/updateColWidthReducer'
import { updateRowHeightAndWidthReducer } from './reducer/layout/updateRowHeightAndWidthReducer'

// Load operations
import { loadBlockAtPosThousandReducer } from './reducer/load/loadBlockAtPosThousandReducer'
import { loadQuotationReducer } from './reducer/load/loadItemsReducer'
import { removeBlockFromPosThousandReducer } from './reducer/load/removeBlockFromPosThousandReducer'

// Pin operations
import { hideBoqItemPinsReducer } from './reducer/pin/hideBoqItemPinsReducer'
import { hideBoqPriceCellPinsReducer } from './reducer/pin/hideBoqPriceCellPinsReducer'
import { hideCellPinReducer } from './reducer/pin/hideCellPinReducer'
import { pinItemPriceReducer } from './reducer/pin/pinItemPriceReducer'
import { pinPriceReducer } from './reducer/pin/pinPriceReducer'
import { pinQtyReducer } from './reducer/pin/pinQtyReducer'
import { showBoqPriceCellPinsReducer } from './reducer/pin/showBoqPriceCellPinsReducer'
import { showCellPinReducer } from './reducer/pin/showCellPinReducer'

// Update operations
import { updateBlockTextReducer } from './reducer/update/updateBlockTextReducer'
import { updateBookmarkedRowCellReducer } from './reducer/update/updateBookmarkedRowCellReducer'
import { updateBoqColumnNameTextReducer } from './reducer/update/updateBoqColumnNameTextReducer'
import { updateBoqHeaderTextReducer } from './reducer/update/updateBoqHeaderTextReducer'
import { updateCellReducer } from './reducer/update/updateCellReducer'
import { updateItemInfoReducer } from './reducer/update/updateItemInfoReducer'
import { updateItemPreviewReducer } from './reducer/update/updateItemPreviewReducer'
import { updatePriceReducer } from './reducer/update/updatePriceReducer'
import { updatePriceTitleReducer } from './reducer/update/updatePriceTitleReducer'
import { updateQuotationInfoReducer } from './reducer/update/updateQuotationInfoReducer'
import { updateSubTotalPriceReducer } from './reducer/update/updateSubTotalPriceReducer'

const initialState: Quotation = {
  id: '',
  quotationSchemaVersion: 2,
  type: 'quotation',
  name: '',
  category: '',
  desc: '',
  info: '',
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  openedAt: null,
  viewedAt: null,
  email: 'unknown@gmail.com',
  permissionLevel: 'NEW',
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
    hideBoqItemPinsReducer,
    hideCellPinReducer,
    pasteItemReducer,
    pinItemPriceReducer,
    pinQtyReducer,
    pinPriceReducer,
    reOrderRowsReducer,
    reOrderBlocksReducer,
    showCellPinReducer,
    showBoqPriceCellPinsReducer,
    hideBoqPriceCellPinsReducer,
    updateCellReducer,
    updateBookmarkedRowCellReducer,
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
