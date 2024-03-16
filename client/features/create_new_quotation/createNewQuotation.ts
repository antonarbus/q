import { router } from '@lib_instances/Router'
import { dispatch } from '@lib_instances/store'
import { theme } from '@lib_instances/theme'
import { defaultItems, isItemsFroalaSignal, itemsSlice, reRenderItemsSignal, saveItemsLocally } from '@entities/items'
import { quotationSignal, saveQuotationLocally } from '@entities/quotation'
import { route } from '@shared/consts/route'
import { nanoid } from '@shared/lib/nanoid'
import { navSlice } from '@shared/nav'

export const createNewQuotation = (): void => {
  isItemsFroalaSignal.value = false
  dispatch(itemsSlice.actions.loadItemsReducer({ items: defaultItems }))
  saveItemsLocally({ items: defaultItems })
  quotationSignal.value = { id: 'local version', email: '' }
  saveQuotationLocally()
  dispatch(navSlice.actions.enableTopNavItem({ navMenuItemIdKey: 'save' }))
  reRenderItemsSignal.value = nanoid(3)
  void router.navigate(route.root)

  setTimeout(() => {
    isItemsFroalaSignal.value = true
  }, 1000 * theme.item.animationDuration)
}
