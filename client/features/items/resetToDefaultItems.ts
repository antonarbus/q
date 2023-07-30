import { store } from 'client/shared/clients'
import { defaultItems } from './defaultItems'
import { saveItemsIntoLocalStorage } from './saveItemsIntoLocalStorage'
import { reloadOffer } from 'client/entities/offer'

export const resetToDefaultItems = () => {
  saveItemsIntoLocalStorage(defaultItems)
  store.dispatch({ type: 'items/resetItemsToDefault' }) // send action as an object, coz if use an action creator function a circular reference happens
  store.dispatch(reloadOffer())
}
