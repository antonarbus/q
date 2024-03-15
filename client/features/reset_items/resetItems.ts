import { dispatch } from '@lib_instances/store'
import { theme } from '@lib_instances/theme'
import { defaultItems, isItemsFroalaSignal, itemsSlice, reRenderItemsSignal, saveItemsLocally } from '@entities/items'
import { navSlice } from '@entities/nav'
import { quotationSignal, saveQuotationLocally } from '@entities/quotation'
import { nanoid } from '@shared/lib/nanoid'

export const resetItems = (): void => {
  isItemsFroalaSignal.value = false
  dispatch(itemsSlice.actions.loadItemsReducer({ items: defaultItems }))
  saveItemsLocally({ items: defaultItems })
  quotationSignal.value = { id: 'local version', email: '' }
  saveQuotationLocally()
  dispatch(navSlice.actions.enableTopNavItem({ navMenuItemIdKey: 'save' }))
  reRenderItemsSignal.value = nanoid(3)
  setTimeout(() => {
    isItemsFroalaSignal.value = true
  }, 1000 * theme.item.animationDuration)
}
