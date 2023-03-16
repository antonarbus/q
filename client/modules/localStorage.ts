import { templateOffer } from 'client/features/offer/templateOffer'
import { store } from 'client/store'
import { jsonSafeParse } from 'utils/jsonSafeParse'

export const getItemsFromLocalStorage = () => {
  const items = jsonSafeParse(localStorage.getItem('items')) || saveItemsIntoLocalStorage(templateOffer)
  return items
}

export const saveItemsIntoLocalStorage = (items = store.getState().items) => {
  localStorage.setItem('items', JSON.stringify(items))
  return items
}
