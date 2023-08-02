import { store } from 'client/shared/clients'
import { defaultItems } from 'client/entities/items'
import { reloadOffer } from 'client/entities/offer'
import { saveItemsLocally } from './saveItemsLocally'

export const resetToDefaultItems = (): void => {
  saveItemsLocally({ items: defaultItems })
  store.dispatch({ type: 'items/resetItemsToDefault' }) // send action as an object, coz if use an action creator function a circular reference happens
  store.dispatch(reloadOffer())
}
