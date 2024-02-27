import { dispatch } from '@lib_instances/store'
import { theme } from '@lib_instances/theme'
import { defaultItems, itemsSlice, saveItemsLocally } from '@entities/items'
import { getDefaultOrLocalQuotation, quotationSignal } from '@entities/quotation'
import { localStorageKey } from '@shared/consts/localStorageKey'
import { generalSlice } from '@shared/general'

export const resetItems = (): void => {
  dispatch(generalSlice.actions.disableFroala())
  saveItemsLocally({ items: defaultItems })
  localStorage.removeItem(localStorageKey.quotation)
  quotationSignal.value = getDefaultOrLocalQuotation()
  dispatch(itemsSlice.actions.resetItemsToDefaultReducer())
  dispatch(generalSlice.actions.reRenderOffer())
  setTimeout(() => {
    dispatch(generalSlice.actions.enableFroala())
  }, 1000 * theme.item.animationDuration)
}
