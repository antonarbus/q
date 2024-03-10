import { dispatch } from '@lib_instances/store'
import { theme } from '@lib_instances/theme'
import { nanoid } from 'nanoid'
import { defaultItems, isItemsFroalaSignal, itemsSlice, reRenderItemsSignal, saveItemsLocally } from '@entities/items'
import { getDefaultOrLocalQuotation, quotationSignal } from '@entities/quotation'
import { localStorageKey } from '@shared/consts/localStorageKey'
import { markAsNotSaved } from '@shared/isSaved'

export const resetItems = (): void => {
  isItemsFroalaSignal.value = false
  saveItemsLocally({ items: defaultItems })

  localStorage.removeItem(localStorageKey.quotation)
  quotationSignal.value = getDefaultOrLocalQuotation()
  markAsNotSaved()
  // dispatch(itemsSlice.actions.resetItemsToDefaultReducer())
  reRenderItemsSignal.value = nanoid(3)
  setTimeout(() => {
    isItemsFroalaSignal.value = true
  }, 1000 * theme.item.animationDuration)
}
