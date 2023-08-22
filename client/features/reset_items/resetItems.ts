import { store } from 'client/shared/clients'
import { defaultItems, itemsSlice } from 'client/entities/items'
import { offerSlice } from 'client/entities/offer'
import { saveItemsLocally } from 'client/shared/lib'

export const resetItems = (): void => {
  saveItemsLocally({ items: defaultItems })
  store.dispatch(itemsSlice.actions.resetItemsToDefault())
  store.dispatch(offerSlice.actions.reloadOffer())
}
