import { createSlice, current } from '@reduxjs/toolkit'
import { PastePlace } from 'client/copy/usePasteCords'
import { ItemType, OfferType, templateOffer } from './templateOffer'

const offerInLocalStorage = localStorage.getItem('currentOffer')
const offerFromLocalStorage = !!offerInLocalStorage && JSON.parse(offerInLocalStorage || '')
const initialState: OfferType = offerFromLocalStorage || templateOffer

const offerSlice = createSlice({
  name: 'offer',
  initialState,
  reducers: {
    updateWidth: (state, action) => {
      // console.log(current(state))
      const { width, index } = action.payload
      state.items[index].width = width
    },
    updateOrderAfterDrag: (state, action) => {
      state.items = action.payload.sortedItems
    },
    addPasteText: (state, action) => {
      const { pastePos, itemId }: PastePlace = action.payload
      state.items = state.items.filter(item => item.type !== 'paste')
      if (pastePos === 'middle') return
      const insertAtIndex = state.items.findIndex(item => item.id === itemId) + (pastePos === 'bottom' ? 1 : 0)
      const pasteHereEl: ItemType = { id: 'paste id', type: 'paste', width: '', height: 0, innerHtml: '' }
      state.items.splice(insertAtIndex, 0, pasteHereEl)
    },
    removePasteText: (state) => {
      state.items = state.items.filter((item) => item.type !== 'paste')
    }
  }
})

export default offerSlice.reducer
export const { updateWidth, updateOrderAfterDrag, addPasteText, removePasteText } = offerSlice.actions
