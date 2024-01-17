import { appSlice } from '@entities/app'
import { defaultItems, itemsSlice } from '@entities/items'
import { dispatch, theme } from '@shared/clients'
import { saveItemsLocally } from '@shared/lib'

export const resetItems = (): void => {
  dispatch(appSlice.actions.disableFroala())
  saveItemsLocally({ items: defaultItems })
  dispatch(itemsSlice.actions.resetItemsToDefaultReducer())
  dispatch(appSlice.actions.reRenderOffer())
  setTimeout(() => {
    dispatch(appSlice.actions.enableFroala())
  }, 1000 * theme.item.animationDuration)
}
