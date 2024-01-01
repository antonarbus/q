import { type PayloadAction, createSlice } from '@reduxjs/toolkit'

type InitialState = {
  priceWasChangedManually: {
    isOpen: boolean
    itemIndex: number | null
    rowIndex: number | null
  }
}

const initialState: InitialState = {
  priceWasChangedManually: {
    isOpen: false,
    itemIndex: null,
    rowIndex: null,
  },
}

export const dialogSlice = createSlice({
  name: 'dialog',
  initialState,
  reducers: {
    showPriceWasChangedManuallyDialog: (state, action: PayloadAction<{
      rowIndex: number
      itemIndex: number
    }>) => {
      const { rowIndex, itemIndex } = action.payload
      state.priceWasChangedManually.isOpen = true
      state.priceWasChangedManually.rowIndex = rowIndex
      state.priceWasChangedManually.itemIndex = itemIndex
    },
    hidePriceWasChangedManuallyDialog: (state) => {
      state.priceWasChangedManually.isOpen = false
      state.priceWasChangedManually.rowIndex = null
      state.priceWasChangedManually.itemIndex = null
    },
  },
})
