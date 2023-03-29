import { defaultItems } from 'client/features/items/defaultItems'
import { reloadOffer } from 'client/features/offer/offerSlice'
import { store } from 'client/store'
import { jsonSafeParse } from 'utils/jsonSafeParse'

export const getItemsFromLocalStorage = () => {
  const items = jsonSafeParse(localStorage.getItem('items')) || saveItemsIntoLocalStorage(defaultItems)
  return items
}

export const saveItemsIntoLocalStorage = (items = store.getState().items) => {
  localStorage.setItem('items', JSON.stringify(items))
  return items
}

export const resetItems = () => {
  saveItemsIntoLocalStorage(defaultItems)
  store.dispatch({ type: 'items/resetItemsToDefault' }) // send action as an object, coz if use an action creator function reference a circular reference happens
  store.dispatch(reloadOffer())
}
