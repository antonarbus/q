import { PayloadAction, createSelector, createSlice, current } from '@reduxjs/toolkit'
import { hideCopyContainer, pasteItem, updatePasteTextPos } from 'client/features/copy/copySlice'
import { getItemsFromLocalStorage } from 'client/modules/localStorage'
import { AppThunk, RootState } from 'client/store'
import { nanoid } from 'nanoid'
import { CopyPlaceType } from '../copy/types'
import { defaultItems } from './defaultItems'
import { ItemType, ItemsType } from './types'
// import isEqual from 'lodash.isequal'

type ItemUpdatePayloadType = {
  index: number,
  props: Partial<ItemType>
}

const initialState: ItemsType = getItemsFromLocalStorage()

const itemsSlice = createSlice({
  name: 'items',
  initialState,
  reducers: {
    saveItemsOrder: (state, action) => action.payload.sortedItems,
    deleteItem: (state, action) => state.filter(item => item.id !== action.payload.id),
    updateItem: (state, action: PayloadAction<ItemUpdatePayloadType>) => {
      // console.log(current(state))
      const { index, props } = action.payload
      state[index] = { ...state[index], ...props }
    },
    resetItemsToDefault: () => defaultItems
  },
  extraReducers: (builder) => {
    builder
      .addCase(updatePasteTextPos, (state, action) => {
        // respond to updatePastePos() action of copySlice, takes current state slice, but action.payload comes from copySlice
        const { pastePos, itemId }: CopyPlaceType = action.payload
        const itemsWithoutPasteText = state.filter(item => item.type !== 'paste')
        if (pastePos === 'middle') return itemsWithoutPasteText
        // debugger
        const insertAtIndex = itemsWithoutPasteText.findIndex(item => item.id === itemId) + (pastePos === 'bottom' ? 1 : 0)
        const pasteTextEl: ItemType = { id: 'paste id', type: 'paste', width: 0, height: 0, html: '', msg: '' }
        itemsWithoutPasteText.splice(insertAtIndex, 0, pasteTextEl)
        return itemsWithoutPasteText
      })
      .addCase(hideCopyContainer, (state) => state.filter(item => item.type !== 'paste'))
      .addCase(pasteItem, (state, action) => {
        const { itemId, pastePos, item } = action.payload
        const modifiableItem = structuredClone(item)
        modifiableItem.msg = ''
        const itemToPaste = { ...modifiableItem, id: nanoid(5) }
        const hoveredItemIndex = state.findIndex(item => item.id === itemId)

        const getSpliceSettings = () => {
          const spliceSettings = { insertAtIndex: hoveredItemIndex, deleteCount: 0 }
          if (pastePos === 'top') {
            spliceSettings.insertAtIndex--
            return spliceSettings
          }
          if (pastePos === 'bottom') {
            spliceSettings.insertAtIndex++
            return spliceSettings
          }
          spliceSettings.deleteCount++
          return spliceSettings
        }

        const spliceSettings = getSpliceSettings()
        const itemsWithoutPasteText = state.filter(item => item.type !== 'paste')
        itemsWithoutPasteText.splice(spliceSettings.insertAtIndex, spliceSettings.deleteCount, itemToPaste)
        return itemsWithoutPasteText
      })
  }
})

// exports
export const { saveItemsOrder, deleteItem, resetItemsToDefault, updateItem } = itemsSlice.actions
export default itemsSlice.reducer

// selectors
export const selectIsLastItem = (state: RootState) => state.items.filter((item) => item.type !== 'paste').length === 1

export const selectItemsShape = createSelector(
  [(state: RootState) => state.items],
  (items) => items,
  {
    memoizeOptions: {
      // resultEqualityCheck: isEqual
      resultEqualityCheck: (prevItems:ItemsType, currentItems:ItemsType) => {
        const addedOrDeletedItem = prevItems.length !== currentItems.length
        if (addedOrDeletedItem) return false
        const itemsIdsDoNotMatch = prevItems.some((item, index) => item.id !== currentItems[index]?.id)
        if (itemsIdsDoNotMatch) return false
        return true
      }
    }
  }
)

// thunks
export const tellItemSavedLocally = (index: number, ms = 1700): AppThunk => (dispatch, getState) => {
  dispatch(updateItem({ index, props: { msg: 'saved locally' } }))
  setTimeout(() => {
    dispatch(updateItem({ index, props: { msg: '' } }))
  }, ms)
}
