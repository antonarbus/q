import { dispatch, theme } from 'client/shared/clients'
import { defaultItems, itemsSlice } from 'client/entities/items'
import { appSlice } from 'client/entities/app'
import { saveItemsLocally } from 'client/shared/lib'

export const resetItems = (): void => {
  dispatch(appSlice.actions.disableFroala())
  saveItemsLocally({ items: defaultItems })
  dispatch(itemsSlice.actions.resetItemsToDefault())
  dispatch(appSlice.actions.reLoadOffer())
  setTimeout(() => {
    dispatch(appSlice.actions.enableFroala())
  }, 1000 * theme.item.animationDuration)
}
