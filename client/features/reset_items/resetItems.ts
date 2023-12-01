import { dispatch, theme } from 'client/shared/clients'
import { defaultItems, itemsSlice } from 'client/entities/items'
import { appSlice } from 'client/entities/app'
import { saveItemsLocally } from 'client/shared/lib'
import { copySlice } from 'client/entities/copy'

export const resetItems = (): void => {
  dispatch(copySlice.actions.enterIntoCopyMode())
  saveItemsLocally({ items: defaultItems })
  dispatch(itemsSlice.actions.resetItemsToDefault())
  dispatch(appSlice.actions.reLoadOffer())
  setTimeout(() => {
    dispatch(copySlice.actions.exitFromCopyMode())
  }, 1000 * theme.item.animationDuration)
}
