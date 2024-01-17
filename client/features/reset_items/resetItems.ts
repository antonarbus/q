import { generalSlice } from '@entities/general'
import { defaultItems, itemsSlice } from '@entities/items'
import { dispatch, theme } from '@shared/clients'
import { saveItemsLocally } from '@shared/lib'

export const resetItems = (): void => {
  dispatch(generalSlice.actions.disableFroala())
  saveItemsLocally({ items: defaultItems })
  dispatch(itemsSlice.actions.resetItemsToDefaultReducer())
  dispatch(generalSlice.actions.reRenderOffer())
  setTimeout(() => {
    dispatch(generalSlice.actions.enableFroala())
  }, 1000 * theme.item.animationDuration)
}
