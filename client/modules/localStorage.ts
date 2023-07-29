import { defaultItems } from 'client/features/items/defaultItems'
import { store } from 'client/app/store'
import { cleanItems } from 'utils/itemsUtils'
import { jsonSafeParse } from 'utils/jsonSafeParse'
import { reloadOffer } from 'client/entities/offer'

export const getItemsFromLocalStorage = () => {
  const items = jsonSafeParse(localStorage.getItem('items')) || saveItemsIntoLocalStorage(defaultItems)
  return items
}

export const saveItemsIntoLocalStorage = (items = store.getState().items) => {
  const cleanedItems = cleanItems(items)
  localStorage.setItem('items', JSON.stringify(cleanedItems))
  return cleanedItems
}

export const resetToDefaultItems = () => {
  saveItemsIntoLocalStorage(defaultItems)
  store.dispatch({ type: 'items/resetItemsToDefault' }) // send action as an object, coz if use an action creator function reference a circular reference happens
  store.dispatch(reloadOffer())
}
