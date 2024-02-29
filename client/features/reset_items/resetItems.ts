import { dispatch } from '@lib_instances/store'
import { theme } from '@lib_instances/theme'
import { defaultItems, itemsSlice, saveItemsLocally } from '@entities/items'
import { getDefaultOrLocalIsSaved, getDefaultOrLocalQuotation, isSavedSignal, quotationSignal } from '@entities/quotation'
import { localStorageKey } from '@shared/consts/localStorageKey'
import { generalSlice } from '@shared/general'

export const resetItems = (): void => {
  dispatch(generalSlice.actions.disableFroala())
  saveItemsLocally({ items: defaultItems })
  localStorage.removeItem(localStorageKey.quotation)
  quotationSignal.value = getDefaultOrLocalQuotation()
  localStorage.removeItem(localStorageKey.isSaved)
  isSavedSignal.value = getDefaultOrLocalIsSaved()
  dispatch(itemsSlice.actions.resetItemsToDefaultReducer())
  dispatch(generalSlice.actions.reRenderOffer())
  setTimeout(() => {
    dispatch(generalSlice.actions.enableFroala())
  }, 1000 * theme.item.animationDuration)
}
