import { dispatch } from 'client/shared/clients'
import { defaultItems, itemsSlice } from 'client/entities/items'
import { offerSlice } from 'client/entities/offer'
import { saveItemsLocally } from 'client/shared/lib'

export const resetItems = (): void => {
  saveItemsLocally({ items: defaultItems })
  dispatch(itemsSlice.actions.resetItemsToDefault())
  dispatch(offerSlice.actions.reloadOffer())
}
