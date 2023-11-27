import { dispatch, theme } from 'client/shared/clients'
import { defaultItems, itemsSlice } from 'client/entities/items'
import { offerSlice } from 'client/entities/offer'
import { saveItemsLocally } from 'client/shared/lib'
import { copySlice } from 'client/entities/copy'

export const resetItems = (): void => {
  dispatch(copySlice.actions.enterIntoCopyMode())
  saveItemsLocally({ items: defaultItems })
  dispatch(itemsSlice.actions.resetItemsToDefault())
  dispatch(offerSlice.actions.reloadOffer())
  setTimeout(() => {
    dispatch(copySlice.actions.exitFromCopyMode())
  }, 1000 * theme.item.animationDuration)
}
