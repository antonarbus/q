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
      const { width, index } = action.payload
      state.items[index].width = width
    },
    updateOrderAfterDrag: (state, action) => {
      state.items = action.payload.sortedItems
    },
    movePasteText: (state, action) => {
      const { pastePos, itemId }: PastePlace = action.payload
      // console.log(current(state))
      // const items = structuredClone(state.items)
      state.items = state.items.filter((item) => item.type !== 'paste')
      // console.log(current(state))
      const insertAtIndex = state.items.findIndex(item => item.id === itemId) + (pastePos === 'bottom' ? 1 : 0)

      const pasteHereEl: ItemType = { id: 'paste id', type: 'paste', width: '', height: 0, innerHtml: '' }
      state.items.splice(insertAtIndex, 0, pasteHereEl)
      console.log(current(state))

      // state.items = itemsWithPasteHereText
      console.log(current(state))
    },
  }
})

export default offerSlice.reducer
export const { updateWidth, updateOrderAfterDrag, movePasteText } = offerSlice.actions
