import { createSlice } from '@reduxjs/toolkit'
import type { Reducer } from '@reduxjs/toolkit'
import type { Quotation } from '@back/entity/quotation/schema'

// Delete operations
import { deleteBlock } from './reducer/delete/deleteBlock'
import { deleteRow } from './reducer/delete/deleteRow'

// Insert/paste operations
import { pasteItem } from './reducer/insert/pasteItem'
import { reOrderBlocks } from './reducer/insert/reOrderItems'
import { reOrderRows } from './reducer/insert/reOrderRows'

// Layout operations
import { updateBlockHeight } from './reducer/layout/updateBlockHeight'
import { updateBlockWidth } from './reducer/layout/updateBlockWidth'
import { updateColWidth } from './reducer/layout/updateColWidth'
import { updateRowHeightAndWidth } from './reducer/layout/updateRowHeightAndWidth'

// Load operations
import { loadBlockAtPosThousand } from './reducer/load/loadBlockAtPosThousand'
import { loadQuotation } from './reducer/load/loadQuotation'
import { removeBlockFromPosThousand } from './reducer/load/removeBlockFromPosThousand'

// Pin operations
import { hideBoqItemPins } from './reducer/pin/hideBoqItemPins'
import { hideBoqPriceCellPins } from './reducer/pin/hideBoqPriceCellPins'
import { hideCellPin } from './reducer/pin/hideCellPin'
import { pinItemPrice } from './reducer/pin/pinItemPrice'
import { pinPrice } from './reducer/pin/pinPrice'
import { pinQty } from './reducer/pin/pinQty'
import { showBoqPriceCellPins } from './reducer/pin/showBoqPriceCellPins'
import { showCellPin } from './reducer/pin/showCellPin'

// Update operations
import { updateBlockText } from './reducer/update/updateBlockText'
import { updateBookmarkedRowCell } from './reducer/update/updateBookmarkedRowCell'
import { updateBoqColumnNameText } from './reducer/update/updateBoqColumnNameText'
import { updateBoqHeaderText } from './reducer/update/updateBoqHeaderText'
import { updateCell } from './reducer/update/updateCell'
import { updateItemInfo } from './reducer/update/updateItemInfo'
import { updatePayment } from './reducer/update/updatePayment'
import { updatePaymentHeading } from './reducer/update/updatePaymentHeading'
import { updatePaymentPayButtonLabel } from './reducer/update/updatePaymentPayButtonLabel'
import { updatePrice } from './reducer/update/updatePrice'
import { updatePriceTitle } from './reducer/update/updatePriceTitle'
import { updateQuotationInfo } from './reducer/update/updateQuotationInfo'
import { updateSubTotalPrice } from './reducer/update/updateSubTotalPrice'

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
  permissionLevel:
    location.pathname.toUpperCase().includes('NEW') || location.pathname === '/'
      ? 'NEW'
      : 'UNKNOWN',
  access: {
    level: 'nobody',
    userList: [],
  },
  paidAt: null,
  blocks: [],
}

export const quotationSlice = createSlice({
  name: 'quotation',
  initialState,
  reducers: {
    loadQuotation,
    loadBlockAtPosThousand,
    removeBlockFromPosThousand,
    resetQuotation: () => initialState,
    deleteRow,
    deleteBlock,
    hideBoqItemPins,
    hideCellPin,
    pasteItem,
    pinItemPrice,
    pinQty,
    pinPrice,
    reOrderRows,
    reOrderBlocks,
    showCellPin,
    showBoqPriceCellPins,
    hideBoqPriceCellPins,
    updateCell,
    updateBookmarkedRowCell,
    updateBoqColumnNameText,
    updateBoqHeaderText,
    updateRowHeightAndWidth,
    updateColWidth,
    updateBlockHeight,
    updateBlockText,
    updateBlockWidth,
    updateSubTotalPrice,
    updatePriceTitle,
    updatePrice,
    updatePaymentBlock: updatePayment,
    updatePaymentHeading,
    updatePaymentPayButtonLabel,
    updateQuotationInfo,
    updateItemInfo,
  },
})

export const quotationReducer: Reducer<Quotation> = quotationSlice.reducer
