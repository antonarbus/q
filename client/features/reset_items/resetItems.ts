import { theme } from '@libras/theme'
import { defaultItems, itemsSlice, saveItemsLocally } from '@entities/items'
import { dispatch } from '@shared/clients'
import { generalSlice } from '@shared/general'

export const resetItems = (): void => {
  dispatch(generalSlice.actions.disableFroala())
  saveItemsLocally({ items: defaultItems })
  dispatch(itemsSlice.actions.resetItemsToDefaultReducer())
  dispatch(generalSlice.actions.reRenderOffer())
  setTimeout(() => {
    dispatch(generalSlice.actions.enableFroala())
  }, 1000 * theme.item.animationDuration)
}
